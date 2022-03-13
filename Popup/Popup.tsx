import "./index.less"
import { useState } from "react";
import { useSpring, animated } from '@react-spring/web'

type PopopProps = {
  position?: string;
  className?: string;
  show: boolean;
  children: any,
  onMaskClick?: Function;
  destroyOnClose?: boolean;
  popupStyle?: Object
}

export function Popup(_props: PopopProps) {
  const props = Object.assign({}, _props)
  const { position = 'center', show, children, onMaskClick, destroyOnClose = false } = props;
  const [active, setActive] = useState<boolean | null>(show)
  const name = (position === 'center' || position === '') ? 'lan-popup-center' : `lan-popup-${position}`;

  const { percent } = useSpring({
    percent: show ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
    },
    onStart: () => {
      setActive(true)

    },
    onRest: () => {
      setActive(show)
    },
  })

  const conRender = () => {
    const scroll = position === 'left' || position === 'right' ? 'overflowX' : 'overflowY'
    return (
      <div
        className={props.className}
        style={{ display: active ? 'unset' : 'none' }}
      >
        <animated.div
          className={`${name}`}
          style={{
            ...props.popupStyle,
            transform: percent.to(v => {
              if (props.position === 'down') {
                return `translate(0, ${v}%)`
              }
              if (props.position === 'up') {
                return `translate(0, -${v}%)`
              }
              if (props.position === 'left') {
                return `translate(-${v}%, 0)`
              }
              if (props.position === 'right') {
                return `translate(${v}%, 0)`
              }
              return 'translate(-50%, -50%)'
            }),
            opacity: percent.to(v => {
              if (props.position === 'center' || position === '') {
                return `${100 - v}%`
              }
              return 1
            }),
          }}
        >
          <div className="lan-popup-content" style={{ 'position': 'fixed', width: '100%', height: '100%', [scroll]: 'scroll' }}>
            {children}
          </div>
        </animated.div>

        {/* <div className="lan-popup-mask" onClick={() => { onMaskClick('close') }}></div> */}
        <animated.div className="lan-popup-mask" style={{
          opacity: percent.to(v => {
            return `${100 - v}%`
          }),
        }} onClick={() => { onMaskClick('close') }}>
        </animated.div >
      </div>
    )
  }
  return <>
    {conRender()}
  </>


}
