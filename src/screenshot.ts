import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface tabtabToolsProps {
  id?: string;
  pngScale?: number;
  pdfScale?: number;
}

export class tabtabTools {
  id: string;
  pngScale: number;
  pdfScale: number;

  constructor(options?: tabtabToolsProps) {
    const { id, pngScale, pdfScale } = options || {};
    this.id = id || 'exportToCanvas';
    this.pngScale = pngScale || 1.025;
    this.pdfScale = pdfScale || 1.25;
  }

  setInitValue = (options?: tabtabToolsProps) => {
    if (options?.id) this.id = options?.id;
    if (options?.pngScale) this.pngScale = options?.pngScale;
    if (options?.pdfScale) this.pdfScale = options?.pdfScale;
  }

  addStyle = (content: string) => {
    const style = document.createElement('style');
    style.innerHTML = content;
    document.head.appendChild(style);
  }

  addScript = (src: string) => {
    const script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
  }

  createElement = () => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="tabtab-active-wrapper">
                <div class="tabtab-menu-wrap">
                    <div class="tabtab-menu exportPng" title="导出为图片">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19 3 3v-5.5"/><path d="m17 22 3-3"/><circle cx="9" cy="9" r="2"/></svg>
                    </div>
                    <div class="tabtab-menu exportPdf" title="导出为pdf">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                    </div>
                </div>
                <div class="tabtab-tools">
                    <svg fill='currentColor' width="1.127em" height="1em" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 231.06 190.75"><rect  x="46.05" y="5.57" width="46.31" height="138.96" /><rect x="0" y="144.44" width="46.31" height="46.3" /><path d="M138.92,46.3V0H0v46.3c46.31,0,92.61,0,138.91,0" /><rect x="138.73" y="46.21" width="46.3" height="111.68" /><rect x="184.76" y="0" width="46.3" height="46.3" /> <path d="M92.15,144.45v46.3h138.91v-46.3c-46.31,0-92.61,0-138.91,0" /></svg>
                </div>
            </div>`;
    document.body.appendChild(div);
    const pngIcon = document.querySelector('.exportPng') as HTMLElement;
    const pdfIcon = document.querySelector('.exportPdf') as HTMLElement;
    if (pngIcon) pngIcon.onclick = () => this.downloadPng();
    if (pdfIcon) pdfIcon.onclick = () => this.exportPdf();
  }

  exportPng = async () => {
    const element = document.getElementById(this.id);
    if (!element) return console.warn('Element not found!');

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    document.body.appendChild(clone);

    const contentHeight = clone.scrollHeight * this.pngScale;
    const contentWidth = clone.scrollWidth;

    if (!html2canvas) {
      return console.warn('html2canvas not loaded!');
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        windowHeight: contentHeight,
        windowWidth: contentWidth,
        height: contentHeight,
        width: contentWidth,
      });
      return canvas.toDataURL('image/png', 1);
    } finally {
      document.body.removeChild(clone);
    }
  }

  downloadPng = async (filename = 'screenshot.png') => {
    const data = await this.exportPng();
    if (!data) return;
    const link = document.createElement('a');
    link.download = filename;
    link.href = data as string;
    link.click();
    link.remove();
  }

  exportPdf = async (filename = 'document.pdf') => {
    const element = document.getElementById(this.id);
    if (!element) return console.warn('Element not found!');
    // const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      return console.warn('jsPDF not loaded!');
    }
    const pdf = new jsPDF('p', 'mm', 'a4');
    // PDF页面尺寸和边距设置
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;
    const contentHeightMM = pageHeight - 2 * margin;
    const mmToPxFactor = 3.78;
    const scale = 2;

    // 计算每页内容高度（像素）
    const contentHeightPx = contentHeightMM * mmToPxFactor * this.pdfScale; // 1mm ≈ 3.78px

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = `${contentWidth * 1.25}mm`;
    document.body.appendChild(clone);

    try {
      if (!html2canvas) {
        return console.warn('html2canvas not loaded!');
      }
      let position = 0;
      while (position < clone.scrollHeight + contentHeightPx) {
        const canvas = await html2canvas(clone, {
          scale: scale,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scrollY: position,
          windowHeight: contentHeightPx,
          windowWidth: clone.scrollWidth,
          x: 0,
          y: position,
          height: contentHeightPx,
          width: clone.scrollWidth
        });

        // 计算图片在PDF中的高度
        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png', 1.0);
        // 添加新页（第一页不需要添加）
        if (position > 0) {
          pdf.addPage();
        }

        // 添加图片到PDF
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          margin,
          contentWidth,
          imgHeight
        );

        // 更新位置
        position += contentHeightPx;
      }
      // 保存PDF
      pdf.save(filename);
      return true;
    } finally {
      document.body.removeChild(clone);
    }
  }
}

window.addEventListener('load', () => {
  const tools = new tabtabTools();
  tools.addStyle(`.tabtab-active-wrapper {
            position: fixed;
            z-index: 1000;
            right: 20px;
            bottom: 50px;
        }
        .tabtab-tools {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            background-color: #333;
            border-radius: 50px;
        }
        .tabtab-active-wrapper:hover .tabtab-menu-wrap {
            display: block;
        }
        .tabtab-active-wrapper:hover .tabtab-tools {
            display: none;
        }
        .tabtab-menu-wrap {
            display: none;
        }
        .tabtab-menu {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            width: 40px;
            height: 40px;
            margin-top: 10px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            background-color: #333;
            border-radius: 50px;
        }`);
  tools.createElement();
  window.addEventListener('message', async (event) => {
    if (event.data.action === 'prepareScreenshot') {
      const data = await tools.exportPng();
      window.parent.postMessage({ type: 'screenshotData', data: data}, '*');
    } else if (event.data.action === 'prepareGeneratePdf') {
      const data = await tools.exportPdf();
      window.parent.postMessage({ type: 'generatePdfData', data: data}, '*');
    } else if (event.data.action === 'setInitValue') {
      if (event.data.values) tools.setInitValue(event.data.values);
    }
  });
});