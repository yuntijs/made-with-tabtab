import html2canvas from 'html2canvas';

export interface tabtabToolsProps {
  imgScale?: number;
}

export class tabtabTools {
  imgScale: number;
  loading: boolean;
  tasks: Promise<boolean>[];

  constructor(options?: tabtabToolsProps) {
    const { imgScale } = options || {};
    this.imgScale = imgScale || 1;
    this.loading = false;
    this.tasks = [];
  }

  setInitValue = (options?: tabtabToolsProps) => {
    if (options?.imgScale) this.imgScale = options?.imgScale;
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
    div.innerHTML = `<div class="tabtab-tools-wrapper" data-html2canvas-ignore="true">
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
    <div class="tabtab-tools-expand">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
    </div>
</div>`;
    document.body.appendChild(div);
    const pngIcon = document.querySelector('.exportPng') as HTMLElement;
    const pdfIcon = document.querySelector('.exportPdf') as HTMLElement;
    const expandBtn = document.querySelector('.tabtab-tools-expand') as HTMLElement;
    if (pngIcon) pngIcon.onclick = () => this.handleScreenHotPng();
    if (pdfIcon) pdfIcon.onclick = () => this.exportPdf();
    if (expandBtn) expandBtn.onclick = () => {
      this.handleLoading({
        selectors: '.tabtab-tools-wrapper',
        addClass: 'tabtab-tools-wrapper-expand',
      });
      const ele = document.querySelector('.tabtab-tools-wrapper') as HTMLElement;
      if (ele) {
        ele.onmouseleave = (e) => {
          e.stopPropagation();
          if (this.loading) {
            return this.handleAddTask(new Promise((resolve) => {
              this.tasks.shift();
              setTimeout(() => ele.classList.remove('tabtab-tools-wrapper-expand'), 1000);
              resolve(true);
            }));
          }
          ele.classList.remove('tabtab-tools-wrapper-expand');
        };
      }
    };
  }

  handleAddTask = (task: Promise<boolean>) => {
    this.tasks.push(task);
  }

  handleTasks = async () => {
    return Promise.all(this.tasks);
  }

  handleLoading = ({ selectors, addClass, removeClass }: { selectors: string, addClass?: string, removeClass?: string }) => {
    const ele = document?.querySelector(selectors) as HTMLElement;
    if (ele) {
      if (addClass) ele.classList.add(addClass);
      if (removeClass) ele.classList.remove(removeClass);
    }
  }

  exportPng = async () => {
    const element = document.body || document.documentElement;
    if (!element) return console.warn('Element not found!');
    const contentHeight = element.scrollHeight * this.imgScale;
    const contentWidth = element.scrollWidth;
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
  }

  handleScreenHotPng = async (options?: { filename?: string, isDownLoad?: boolean }) => {
    const { filename = 'screenshot.png', isDownLoad = true } = options || {};
    this.loading = true;
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
    this.loading = false;
    this.handleLoading({
      selectors: '.exportPng',
      removeClass: 'show',
    });
    await this.handleTasks();
    return data;
  }

  scrollToBottom = () => {
    return new Promise(resolve => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        window.onscroll = null;
        return resolve(true);
      }
      let isScrollTo = false;
      window.onscroll = async () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const totalHeight = document.body.offsetHeight;
        if (!isScrollTo && scrollPosition >= totalHeight) {
          console.warn('滚动至底部');
          isScrollTo = true;
          await this.sleep(500);
          window.onscroll = null;
          return resolve(true);
        }
      }
      const ele = document.body || document.documentElement;
      window.scrollTo({
        top: ele.scrollHeight,
        behavior: 'smooth'
      });
      this.sleep(5000).then(() => {
        if (!isScrollTo) {
          window.onscroll = null;
          resolve(true);
        }
      });
    });
  }

  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  exportPdf = async () => {
    this.loading = true;
    this.handleLoading({
      selectors: '.exportPdf',
      addClass: 'show',
    });
    await this.scrollToBottom();
    this.loading = false;
    this.handleLoading({
      selectors: '.exportPdf',
      removeClass: 'show',
    });
    await this.handleTasks();
    window.print();
  }
}

window.addEventListener('load', () => {
  const tools = new tabtabTools();
  tools.addStyle(`@media print {
            .tabtab-active-wrapper {
                display: none !important;
            }
        }
        img,svg {
            display: unset !important;
        }
        .tabtab-tools-wrapper {
            position: fixed;
            z-index: 1000;
            right: 0;
            top: 50%;
            width: 50px;
            height: 140px;
            display: flex;
            align-items: end;
            transform: translate(60px, -50%);
            transition: transform 0.2s ease-out;
            transition-delay: 0.4s;
        }
        .tabtab-tools-wrapper-expand {
            transform: translate(0, -50%);
            transition-delay: 0s;
        }
        .tabtab-tools-wrapper-expand .tabtab-tools-expand{
            opacity: 0;
            cursor: pointer;
            transition: opacity 0s 0s;
        }

        .tabtab-active-wrapper {
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: end;
        }
        .tabtab-tools-expand {
            position: absolute;
            height: 32px;
            width: 20px;
            border-radius: 4px 0 0 4px;
            left: -30px;
            bottom: 0;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: opacity 0.15s 0.75s ease-out;
        }
        .tabtab-tools-expand:hover {
           background: #333;
           color: #fff;
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
        .tabtab-active-wrapper:hover .tabtab-menu-transform:nth-of-type(1) {
            transform: translateY(-100px) scale(1.1);
            opacity: 1;
        }
        .tabtab-active-wrapper:hover .tabtab-menu-transform:nth-of-type(2) {
            transform: translateY(-50px) scale(1.1);
            opacity: 1;
        }
        .tabtab-active-wrapper:hover .tabtab-tools {
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