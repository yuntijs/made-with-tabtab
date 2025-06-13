import html2canvas from 'html2canvas';

export interface tabtabToolsProps {
  imgScale?: number;
  imgWidth?: number;
}

export class tabtabTools {
  imgScale: number;
  imgWidth: number;

  constructor(options?: tabtabToolsProps) {
    const { imgScale, imgWidth } = options || {};
    this.imgScale = imgScale || 1;
    this.imgWidth = imgWidth || 1600;
  }

  setInitValue = (options?: tabtabToolsProps) => {
    if (options?.imgScale) this.imgScale = options?.imgScale;
    if (options?.imgWidth) this.imgWidth = options?.imgWidth;
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
    div.innerHTML = `<div class="tabtab-tools-wrapper">
    <div class="tabtab-active-wrapper">
        <div class="tabtab-menu-wrap">
            <div class="tabtab-menu tabtab-menu-transform exportPng" title="导出为图片">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19 3 3v-5.5"/><path d="m17 22 3-3"/><circle cx="9" cy="9" r="2"/></svg>
                <div class="tabtab-menu tabtab-loading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                </div>
            </div>
            <div class="tabtab-menu tabtab-menu-transform exportPdf" title="导出为pdf">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                <div class="tabtab-menu tabtab-loading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                </div>
            </div>
        </div>
        <div class="tabtab-tools">
            <svg fill='currentColor' width="1.127em" height="1em" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 231.06 190.75"><rect  x="46.05" y="5.57" width="46.31" height="138.96" /><rect x="0" y="144.44" width="46.31" height="46.3" /><path d="M138.92,46.3V0H0v46.3c46.31,0,92.61,0,138.91,0" /><rect x="138.73" y="46.21" width="46.3" height="111.68" /><rect x="184.76" y="0" width="46.3" height="46.3" /> <path d="M92.15,144.45v46.3h138.91v-46.3c-46.31,0-92.61,0-138.91,0" /></svg>
        </div>
    </div>
</div>`;
    document.body.appendChild(div);
    const pngIcon = document.querySelector('.exportPng') as HTMLElement;
    const pdfIcon = document.querySelector('.exportPdf') as HTMLElement;
    if (pngIcon) pngIcon.onclick = () => this.handleScreenHotPng();
    if (pdfIcon) pdfIcon.onclick = () => this.exportPdf();
  }

  handleLoading = ({ selectors, addClass, removeClass }: { selectors: string, addClass?: string, removeClass?: string }) => {
    const ele = document?.querySelector(selectors) as HTMLElement;
    if (ele) {
      if (addClass) ele.classList.add(addClass);
      if (removeClass) ele.classList.remove(removeClass);
    }
  }

  hideToolsIcon = (element?: HTMLElement) => {
    const ele = element?.querySelector('.tabtab-active-wrapper') as HTMLElement;
    if (ele) {
      ele.style.display = 'none';
    }
  }

  exportPng = async () => {
    const element = document.body || document.documentElement;
    if (!element) return console.warn('Element not found!');
    const clone = element.cloneNode(true) as HTMLElement;
    this.hideToolsIcon(clone);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = `${this.imgWidth}px`;
    document.body.appendChild(clone);
    const contentHeight = clone.scrollHeight * this.imgScale;
    const contentWidth = clone.scrollWidth;

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

  handleScreenHotPng = async (options?: { filename?: string, isDownLoad?: boolean }) => {
    const { filename = 'screenshot.png', isDownLoad = true } = options || {};
    this.handleLoading({
      selectors: '.exportPng',
      addClass: 'show',
    });
    await this.scrollToBottom();
    const data = await this.exportPng();
    if (isDownLoad && data) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = data as string;
      link.click();
      link.remove();
    }
    this.handleLoading({
      selectors: '.exportPng',
      removeClass: 'show',
    });
    return data;
  }

  scrollToBottom = async () => {
    let isScrollTo = false;
    return new Promise(async resolve => {
      window.onscroll = async () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const totalHeight = document.body.offsetHeight;
        if (!isScrollTo && scrollPosition >= totalHeight) {
          console.warn('滚动至底部', scrollPosition, totalHeight);
          isScrollTo = true;
          await this.sleep(200);
          window.onscroll = null;
          resolve(true);
        }
      }
      const ele = document.body || document.documentElement;
      window.scrollTo({
        top: ele.scrollHeight,
        behavior: 'smooth'
      });
      await this.sleep(5000);
      if (!isScrollTo) {
        window.onscroll = null;
        resolve(true);
      }
    });
  }

  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  exportPdf = async () => {
    this.handleLoading({
      selectors: '.exportPdf',
      addClass: 'show',
    });
    await this.scrollToBottom();
    this.handleLoading({
      selectors: '.exportPdf',
      removeClass: 'show',
    });
    window.print();
  }
}

window.addEventListener('load', () => {
  const tools = new tabtabTools();
  tools.addStyle(`@media print {
            .tabtab-active-wrapper {
                display: none;
            }
        }
        img,svg {
            display: unset !important;
        }
        .tabtab-tools-wrapper {
            position: fixed;
            z-index: 1000;
            right: 20px;
            bottom: 20px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: end;
        }
        .tabtab-active-wrapper {
            position: relative;
        }
        .tabtab-tools {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            background-color: #333;
            border-radius: 50px;
            transition: transform 0.25s ease-out;
        }
        .tabtab-menu {
            position: absolute;
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            width: 32px;
            height: 32px;
            margin-top: 10px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            background-color: #333;
            border-radius: 50px;
        }
        .tabtab-menu-transform {
            opacity: 0.2;
            transform: scale(0.2);
            transition: all 0.15s 0.3s ease-out;
        }
        .scale-02 {
            transform: scale(1.2);
        }
        .tabtab-tools-wrapper:hover {
            height: 140px;
        }
        .tabtab-tools-wrapper:hover .tabtab-menu-transform:nth-of-type(1) {
            transform: translateY(-100px) scale(1.1);
            opacity: 1;
        }
        .tabtab-tools-wrapper:hover .tabtab-menu-transform:nth-of-type(2) {
            transform: translateY(-50px) scale(1.1);
            opacity: 1;
        }
        .tabtab-tools-wrapper:hover .tabtab-tools {
            transform: scale(1.1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
        }
        .tabtab-menu-transform:nth-of-type(1) {
            transition: all 0.3s ease-out;
        }
        .tabtab-loading {
            display: none;
            z-index: 100;
            animation: tabloading 1s linear infinite;
        }
        .show {
            display: flex;
        }
        .show .tabtab-loading {
          display: flex;
        }
        .show.tabtab-menu-transform {
            z-index: 100;
            opacity: 1;
            transform: scale(1);
            transition: all 0.15s 0.3s ease-out;
        }
        .hide {
            display: none;
        }
        @keyframes tabloading {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }`);
  tools.createElement();
  window.addEventListener('message', async (event) => {
    if (event.data.action === 'prepareScreenshot') {
      const data = await tools.handleScreenHotPng({ isDownLoad: false });
      window.parent.postMessage({ type: 'screenshotData', data: data}, '*');
    } else if (event.data.action === 'prepareGeneratePdf') {
      const data = await tools.exportPdf();
      window.parent.postMessage({ type: 'generatePdfData', data: data}, '*');
    } else if (event.data.action === 'setInitValue') {
      if (event.data.values) tools.setInitValue(event.data.values);
    }
  });
});