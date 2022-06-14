import './index.scss';
import LogoS  from '../../../assets/images/logo-s.png'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap-trial';
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin';

const Logo = () => {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();

  return (
    <div className ='logo-container' ref={bgRef}>
        <img ref = {solidLogoRef} className='solid-logo' src={LogoS} alt='S'/>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2345 5109 c-500 -38 -987 -216 -1374 -501 -195 -144 -443 -422 -585
-657 -441 -728 -505 -1658 -170 -2458 117 -280 279 -526 489 -742 406 -418
925 -665 1545 -736 179 -21 558 -16 715 9 411 67 753 196 1070 404 570 373
944 984 1062 1732 23 146 26 624 4 765 -118 783 -483 1375 -1096 1777 -469
308 -1059 453 -1660 407z m-548 -324 c28 -20 46 -75 34 -106 -13 -36 -38 -53
-121 -84 -446 -168 -794 -464 -1030 -876 -35 -60 -72 -117 -84 -125 -51 -36
-130 -2 -142 61 -5 30 1 48 46 128 146 256 357 507 555 658 168 129 399 257
590 328 91 34 122 37 152 16z m1038 -940 c136 -21 234 -49 342 -100 124 -58
192 -105 292 -200 191 -182 311 -403 373 -688 32 -146 32 -456 0 -599 -59
-268 -166 -478 -331 -651 -225 -236 -483 -340 -876 -354 -365 -13 -622 50
-852 209 -84 58 -231 207 -290 293 -91 135 -170 325 -209 505 -15 68 -19 127
-19 300 0 198 2 224 27 326 128 538 481 879 994 958 123 19 424 20 549 1z"/>
</g>
</svg>


    </div>
  )
}

export default Logo