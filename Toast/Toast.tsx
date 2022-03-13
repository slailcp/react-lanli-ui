import ReactDOM from 'react-dom';
import "./index.less"
type ToastProp = {
  dom: HTMLDivElement | null;
  show: Function;
  close: Function;
  setanimationClass: Function
}

type ToastParams = {
  type: string,
  message?: string;
  duration?: number;
  shade?: boolean;
  className?: string;
}

export const Toast: ToastProp = {
  dom: null,
  show(params: ToastParams) {
    let aniClass = 'lan-fande-in';//'lan-fande-scale-in';
    let aniMaskClass = 'lan-fande-in';
    this.dom = document.createElement('div');
    const JSXdom = (
      <>
        <div className={`lan-toast-center ${params.className || ""} ${aniClass}`}>
          <div className='lan-toast-content'>{params.message || ""}</div>
        </div>
        {params.shade ? <div className={`lan-toast-mask ${aniMaskClass}`}> </div> : ""}
      </>
    );

    ReactDOM.render(JSXdom, this.dom);
    (document.querySelector('body') as Element).classList.add('overhide');
    document.body.appendChild(this.dom);

    if (!params.type || params.type === 'text') {
      setTimeout(() => {
        this.close(this.dom)
      }, params.duration || 2000)
    }
    return this.dom;
  },
  close(dom: Element) {
    this.setanimationClass()
    setTimeout(() => {
      dom && dom.remove();
    }, 300);
  },

  setanimationClass() {
    let arrtClass = document.querySelector('.lan-toast-center')?.getAttribute('class')
    arrtClass = arrtClass?.replace(/lan-fande-in/, "lan-fande-out")
    // arrtClass = arrtClass?.replace(/lan-fande-scale-in/, "lan-fande-scale-out")
    document.querySelector('.lan-toast-center')?.setAttribute('class', arrtClass || "")

    let arrtmaskClass = document.querySelector('.lan-toast-mask')?.getAttribute('class')
    arrtmaskClass = arrtmaskClass?.replace(/lan-fande-in/, "lan-fande-out")
    document.querySelector('.lan-toast-mask')?.setAttribute('class', arrtmaskClass || "")

  }

}

