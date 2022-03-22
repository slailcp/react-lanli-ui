import React from 'react';
import ReactDOM from 'react-dom';
import "./index.less"
type ModalProp = {
  dom: HTMLDivElement | null;
  alert: Function;
  confirm: Function;
  close: Function;
  setanimationClass: Function;
}

type AlertParams = {
  title?: string;
  message?: string;
  btnMessage?: string;
}
type ConfirmParams = {
  title?: string;
  message?: string;
  btnEnterMessage?: string;
  cancelEnterMessage?: string;
  beforeClose?: Function;
  compelete?: Function;
}

export const Modal: ModalProp = {
  dom: null,
  alert(arg: AlertParams) {
    // this.onCompelete();
    this.dom = document.createElement('div');
    // const [aniClass, setAniClass] = useState("lan-fande-in")
    let onEnter = () => { };
    let aniClass = 'lan-fande-scale-in';
    let aniMaskClass = 'lan-fande-in';
    //JSX
    const JSXdom = (
      <>
        <div className={`lan-layer lan-layer-center ${aniClass}`}>
          <div className='lan-layer-title'>{arg.title || "提示"}</div>
          <div className='lan-layer-content'>{arg.message || ""}</div>
          <div className='lan-layer-buttons'>
            <div className='lan-layer-btn' onClick={() => {
              onEnter();
            }}>{arg.btnMessage || "确定"}
            </div>
          </div>

        </div>
        <div className={`lan-layer-mask ${aniMaskClass}`}> </div>
      </>
    );

    ReactDOM.render(JSXdom, this.dom);
    (document.querySelector('body') as Element).classList.add('overhide');
    document.body.appendChild(this.dom);

    return new Promise((resolve, reject) => {
      onEnter = () => {
        this.close()
        resolve('enter')
      }
    })
  },
  confirm(arg: ConfirmParams) {
    // this.onCompelete();
    this.dom = document.createElement('div');
    let onfn = (type: string) => { };
    let aniClass = 'lan-fande-scale-in';
    let aniMaskClass = 'lan-fande-in';
    //JSX
    const JSXdom = (
      <>
        <div className={`lan-layer lan-layer-center ${aniClass}`}>
          <div className='lan-layer-title'>{arg.title || "提示"}</div>
          <div className='lan-layer-content'>{arg.message || ""}</div>
          <div className='lan-layer-buttons'>
            <div className='lan-layer-btn lan-btn-cancel' onClick={() => {
              onfn('cancel');
            }}>{arg.cancelEnterMessage || "取消"}
            </div>
            <div className='lan-layer-btn lan-btn-enter' onClick={() => {
              onfn('enter');
            }}>{arg.btnEnterMessage || "确定"}
            </div>
          </div>

        </div>
        <div className={`lan-layer-mask ${aniMaskClass}`}> </div>
      </>
    );
    ReactDOM.render(JSXdom, this.dom);
    (document.querySelector('body') as Element).classList.add('overhide');
    document.body.appendChild(this.dom);
    return new Promise((resolve, reject) => {
      onfn = async (type: string) => {
        aniClass = 'lan-fande-scale-out';
        let ret = null;
        const $btn = document.querySelector(type === 'enter' ? '.lan-btn-enter' : '.lan-btn-cancel');
        if ($btn) { $btn.innerHTML = 'loading...' }

        if (arg.beforeClose) {
          ret = await arg.beforeClose(type)
        }
        if (ret !== false) {
          this.close(() => {
            arg.compelete && arg.compelete()
          })
        }
        if ($btn) { $btn.innerHTML = type === 'enter' ? (arg.btnEnterMessage || "确定") : (arg.cancelEnterMessage || "取消") }
        (type === 'enter' ? resolve : reject)(type)
      }
    })

  },
  close(callback?: Function) {
    this.setanimationClass()
    setTimeout(() => {
      this.dom && this.dom.remove();
      if (callback) { callback() }
    }, 300);
  },
  setanimationClass() {
    let arrtClass = document.querySelector('.lan-layer-center')?.getAttribute('class')
    arrtClass = arrtClass?.replace(/lan-fande-scale-in/, "lan-fande-scale-out")
    document.querySelector('.lan-layer-center')?.setAttribute('class', arrtClass || "")

    let arrtmaskClass = document.querySelector('.lan-layer-mask')?.getAttribute('class')
    arrtmaskClass = arrtmaskClass?.replace(/lan-fande-in/, "lan-fande-out")
    document.querySelector('.lan-layer-mask')?.setAttribute('class', arrtmaskClass || "")
  }
}


