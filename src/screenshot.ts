import html2canvas from 'html2canvas';
import { isMobileDevice } from './utils.ts';

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
            <div class="tabtab-menu tabtab-menu-transform exportPdf ${isMobileDevice() ? 'hide' : ''}" title="导出为pdf">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" width="1em" height="1em"><path d="M137.157 887.116V82.796h347.155v258.319h258.397v238.599h70.257V310.401c0.356-2.87 0.356-5.763 0-8.632v-10.693L533.546 12.539H66.9v944.833h627.314l-61.063-70.257H137.157z m417.411-616.257V132.212l138.166 138.647H554.568z" p-id="1538"></path><path d="M852.719 778.146v-178.89h-169.64v178.891H565.488L772.007 1015.8l197.332-237.654h-116.62z m-139.031 70.257h39.647V669.512h29.127v178.891h41.616l-52.824 61.329-57.566-61.329z" p-id="1539"></path><path d="M177.688 727.33c-4.961 9.028-6.93 22.269-2.395 34.11 4.518 11.793 13.874 19.53 23.555 24.581 7.238 3.804 14.877 5.428 22.484 5.428 13.917 0 27.728-5.436 38.797-12.905 17.131-11.56 32.417-28.445 47.744-49.064 7.761-10.441 13.914-27.38 21.502-39.583 24.481-10.883 140.908-50.095 176.072-57.762 29.457 19.888 60.791 35.234 94.951 35.234 19.346 0 34.277-0.812 48.868-8.747 14.591-7.935 23.408-26.992 23.408-41.538 0-11.851-5.222-24.407-13.439-32.546-8.216-8.139-18.047-12.408-28.05-15.1-11.294-3.039-23.436-4.265-36.561-4.265-10.125 0-20.836 0.73-32.196 1.919-13.811 1.447-32.211 8.713-47.549 11.631-2.021-1.64-4.048-2.323-6.06-4.056-31.216-26.904-60.432-64.057-82.099-100.962-1.337-2.278-1.117-3.733-2.395-6.011 5.252-19.792 15.642-42.707 17.983-60.059 3.226-23.907 3.93-44.839-1.857-64.017-2.893-9.589-7.791-19.212-16.322-26.682-8.531-7.47-20.501-11.533-31.716-11.533-18.823 0-38.217 10.686-46.816 26.438-8.599 15.752-9.098 32.702-6.988 50.285 3.326 27.717 15.922 59.176 32.253 91.237-8.12 27.429-44.371 127.058-62.713 158.035-60.942 19.128-113.434 64.947-130.461 95.932z m279.477-134.534c-25.651 6.833-82.997 22.548-88.354 24.483 7.656-15.905 31.271-71.607 36.651-86.448 15.402 22.21 32.569 42.846 51.703 61.965z m-68.386-236.397l0.024-0.001c2.539 0 4.315 19.321 3.856 30.809-0.598-2.978-10.419-30.49-3.88-30.808zM276.567 699.903s-15.293 22.941-20.529 22.941a1.35 1.35 0 0 1-0.823-0.254c-6.674-4.893-0.891-10.231 21.352-22.687z m316.062-85.823c-0.318 3.228-1.672 4.844-4.527 4.844-4.428 0-12.468-3.884-25.873-11.663 0 0 30.909 1.656 30.4 6.819z" fill="#ffffff" stroke="#ffffff"></path></svg>
                <div class="tabtab-menu tabtab-loading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                </div>
            </div>
            <div class="tabtab-menu tabtab-menu-transform exportPng" title="导出为图片">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19 3 3v-5.5"/><path d="m17 22 3-3"/><circle cx="9" cy="9" r="2"/></svg>
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

  exportPng = async (fileType: string) => {
    const element = document.body || document.documentElement;
    if (!element) return console.warn('Element not found!');
    const contentHeight = element.scrollHeight * this.imgScale;
    const contentWidth = element.scrollWidth;
    const innerHeight = window.innerHeight;
    const style = document.createElement('style');
    style.innerHTML = `
      .h-screen,.h-svh,.h-lvh,.h-dvh { height: ${innerHeight}px !important; }
      .min-h-screen,.min-h-svh,.min-h-lvh,.min-h-dvh { min-height: ${innerHeight}px !important; }
      .max-h-screen,.max-h-svh,.max-h-lvh,.max-h-dvh { max-height: ${innerHeight}px !important; }
    `;
    document.head.appendChild(style);
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
    }).finally(() => {
      style.remove();
    });
    if (fileType === 'blob') {
      return new Promise((resolve) => {
        canvas.toBlob((blob: Blob | null)=> resolve(blob), 'image/png', 1);
      })
    }
    return canvas.toDataURL('image/png', 1);
  }

  handleScreenHotPng = async (options?: { filename?: string, fileType?: string, isDownLoad?: boolean }) => {
    const { filename = 'tabtab_screenshot.png', fileType = 'blob', isDownLoad = true } = options || {};
    this.loading = true;
    this.handleLoading({
      selectors: '.exportPng',
      addClass: 'show',
    });
    await this.scrollToBottom();
    const data = await this.exportPng(fileType);
    if (isDownLoad && data instanceof Blob) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(data);
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
  tools.addStyle(`* {
            scrollbar-color: hsl(0 0% 100%) hsl(0 0% 100%);
            scrollbar-width: thin;
        }
        *:hover {
            scrollbar-color: hsl(220 13% 91%) hsl(0 0% 100%);
        }
        ::-webkit-scrollbar {
            width: 0.5em;
            height: 0.5em;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
        }
        :hover::-webkit-scrollbar-thumb {
            background-clip: content-box;
            border: 3px solid transparent;
        }
        ::-webkit-scrollbar-track {
            background-color: transparent;
        }
        @media print {
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
            width: 60px;
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
            width: 32px;
            border-radius: 6px 0 0 6px;
            left: -30px;
            bottom: 0;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: opacity 0.15s 0.75s ease-out;
        }
        .tabtab-tools-expand > svg {
            margin-right: 8px;
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
      const data = await tools.handleScreenHotPng({ isDownLoad: false, fileType: event.data.fileType || 'string' });
      window.parent.postMessage({ type: 'screenshotData', data: data}, '*');
    } else if (event.data.action === 'prepareGeneratePdf') {
      const data = await tools.exportPdf();
      window.parent.postMessage({ type: 'generatePdfData', data: data}, '*');
    } else if (event.data.action === 'setInitValue') {
      if (event.data.values) tools.setInitValue(event.data.values);
    }
  });
});