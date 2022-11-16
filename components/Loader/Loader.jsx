import React from 'react'

export default function Loader({ width, animationDuration, color })
{

    const styles = `
    :root
{
  --loader-size: ${width};
  --loader-color: ${color};
  --loader-speed: ${animationDuration}; 
}

.loader
{
  align-self: center;
  width: var(--loader-size);
  position: relative;
  display: flex;
}

.loader::before
{
content: '';
position: absolute;
}

.loader::before,
.loader > span
{
  width: calc(var(--loader-size) / 7);
  height: calc(var(--loader-size) / 7);
  display: inline-block;
  border-radius: 50%;
  background-color: var(--loader-color);
  animation-name: slide-right;
  animation-duration: var(--loader-speed);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.loader > span:nth-of-type(even)
{
  visibility: hidden;
}

.loader > span:first-of-type
{
  animation-name: scale-up;
}

.loader > span:last-of-type
{
  animation-name: scale-up;
  animation-direction: reverse;
}

@keyframes scale-up
{
  from
  {
    scale: 0;
  }
  to
  {
    scale: 1;
  }
}

@keyframes slide-right
{
  to
  {
    transform: translateX(200%);
  }
}
    `
    return (
        <>
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <style jsx>
                {styles}
            </style>
        </>
    )
}
