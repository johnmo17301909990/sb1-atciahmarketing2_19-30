import { saveAs } from 'file-saver';
import { ExportFormat, ExportOptions, ExportData } from '../types/export';

export class ExportService {
  private static formatters = {
    csv: (data: ExportData) => ExportService.formatCSV(data),
    excel: (data: ExportData) => ExportService.formatExcel(data),
    json: (data: ExportData) => JSON.stringify(data, null, 2),
    pdf: (data: ExportData) => ExportService.formatPDF(data),
  };

  static async exportData(data: ExportData, format: ExportFormat, options: ExportOptions = {}) {
    try {
      const formatter = this.formatters[format];
      if (!formatter) {
        throw new Error(`Unsupported export format: ${format}`);
      }

      const formattedData = await formatter(data);
      const fileName = options.fileName || `export-${Date.now()}.${format}`;
      const mimeType = this.getMimeType(format);

      const blob = new Blob([formattedData], { type: mimeType });
      saveAs(blob, fileName);

      return {
        success: true,
        fileName,
        format,
      };
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }

  private static formatCSV(data: ExportData): string {
    const headers = Object.keys(data.columns);
    const rows = data.rows.map(row => 
      headers.map(header => this.escapeCSVValue(row[header])).join(',')
    );
    
    return [
      headers.join(','),
      ...rows
    ].join('\n');
  }

  private static async formatExcel(data: ExportData): Promise<ArrayBuffer> {
    const XLSX = await import('xlsx');
    const worksheet = XLSX.utils.json_to_sheet(data.rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  }

  private static async formatPDF(data: ExportData): Promise<ArrayBuffer> {
    const pdfMake = await import('pdfmake/build/pdfmake');
    const pdfFonts = await import('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
      content: [
        { text: data.title || 'Export Data', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: Array(Object.keys(data.columns).length).fill('*'),
            body: [
              Object.values(data.columns),
              ...data.rows.map(row => Object.values(row))
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    return new Promise((resolve) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBuffer(resolve);
    });
  }

  private static getMimeType(format: ExportFormat): string {
    const mimeTypes = {
      csv: 'text/csv;charset=utf-8;',
      excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      json: 'application/json;charset=utf-8;',
      pdf: 'application/pdf',
    };
    return mimeTypes[format];
  }

  private static escapeCSVValue(value: any): string {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }
}