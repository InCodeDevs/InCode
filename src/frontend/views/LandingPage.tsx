/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
export default function LandingPage() {
  const ic_svg_strokes = [
    "#d623d6",
    "#1aee50",
    "#ffd500",
    "#1aa7ee",
    "#ee1a1a",
    "#1a4aee",
    "#31b61c",
    "#ffffff",
  ];

  const ic_svg_stroke =
    ic_svg_strokes[Math.floor(Math.random() * ic_svg_strokes.length)];
  return (
    <>
      <BrowserRouter>
        <div className={"lp"}>
          <div className={"lp-menubar"}>
            <div className={"lp-menubar-brand"}>
              <img
                src={"/assets/incode-400.png"}
                width={48}
                height={48}
                alt={"Logo"}
              />
              <h1>
                <b>In</b>Code
              </h1>
            </div>
            <div className={"lp-menubar-items"}>
              <a href={"#"}>Home</a>
              <Link to={"/editor"}>Editor</Link>
              <Link to={"/docs"}>Dokumentation</Link>
              <Link to={"/playground"}>Playground</Link>
            </div>
          </div>
        </div>
        <div className={"lp-header"}>
          <div className={"lp-header-left"}>
            <svg
              width="1756"
              height="630"
              viewBox="0 0 878 315"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"lp-ic-svg"}
            >
              <path
                d="M290.584 102.112C293.08 102.112 295.192 102.736 296.92 103.984C298.648 105.136 299.512 106.576 299.512 108.304C299.512 111.376 298.552 113.872 296.632 115.792C294.712 117.616 291.976 118.528 288.424 118.528C282.856 118.528 278.632 118.576 275.752 118.672C275.56 119.824 274.696 125.008 273.16 134.224C271.432 144.496 270.376 150.784 269.992 153.088L266.968 171.952C264.856 186.064 263.176 197.872 261.928 207.376C263.944 207.28 266.68 207.232 270.136 207.232C275.224 207.232 278.68 207.904 280.504 209.248C282.328 210.592 283.24 212.608 283.24 215.296C283.24 217.792 282.232 219.904 280.216 221.632C278.296 223.36 275.56 224.224 272.008 224.224C269.608 224.224 265.816 224.128 260.632 223.936C255.832 223.744 252.664 223.648 251.128 223.648C245.08 223.648 238.456 224.176 231.256 225.232C228.088 225.712 225.832 225.952 224.488 225.952C222.376 225.952 220.6 225.376 219.16 224.224C217.72 223.072 217 221.392 217 219.184C217 215.728 218.536 213.04 221.608 211.12C224.68 209.2 229 208.192 234.568 208.096L241.336 207.952L241.768 204.784C244.072 189.424 245.752 178.576 246.808 172.24L249.976 153.376C251.896 142.24 253.624 130.768 255.16 118.96L243.064 119.104C239.608 119.104 237.208 118.576 235.864 117.52C234.616 116.368 233.992 114.784 233.992 112.768C233.992 106.24 238.696 102.736 248.104 102.256C252.52 102.064 257.896 101.968 264.232 101.968L290.584 102.112Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
              <path
                d="M307.881 224.08C304.233 224.08 301.641 222.16 300.105 218.32C298.665 214.48 297.945 208.336 297.945 199.888C297.945 187.408 299.721 175.552 303.273 164.32C304.137 161.536 305.529 159.52 307.449 158.272C309.465 156.928 312.249 156.256 315.801 156.256C317.721 156.256 319.065 156.496 319.833 156.976C320.601 157.456 320.985 158.368 320.985 159.712C320.985 161.248 320.265 164.704 318.825 170.08C317.865 173.92 317.097 177.28 316.521 180.16C315.945 183.04 315.465 186.592 315.081 190.816C318.249 182.56 321.801 175.84 325.737 170.656C329.673 165.472 333.513 161.776 337.257 159.568C341.097 157.36 344.601 156.256 347.769 156.256C354.009 156.256 357.129 159.376 357.129 165.616C357.129 169.36 356.073 176.128 353.961 185.92C352.137 194.272 351.225 199.792 351.225 202.48C351.225 206.32 352.617 208.24 355.401 208.24C357.321 208.24 359.577 207.088 362.169 204.784C364.857 202.384 368.409 198.544 372.825 193.264C373.977 191.92 375.273 191.248 376.713 191.248C377.961 191.248 378.921 191.824 379.593 192.976C380.361 194.128 380.745 195.712 380.745 197.728C380.745 201.568 379.833 204.544 378.009 206.656C373.881 211.744 369.417 215.92 364.617 219.184C359.913 222.448 354.537 224.08 348.489 224.08C343.593 224.08 339.897 222.688 337.401 219.904C334.905 217.024 333.657 212.896 333.657 207.52C333.657 204.832 334.329 200.032 335.673 193.12C336.921 187.072 337.545 182.896 337.545 180.592C337.545 179.056 337.017 178.288 335.961 178.288C334.713 178.288 332.937 179.92 330.633 183.184C328.425 186.352 326.121 190.576 323.721 195.856C321.417 201.136 319.545 206.704 318.105 212.56C317.049 217.072 315.801 220.144 314.361 221.776C313.017 223.312 310.857 224.08 307.881 224.08Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
              <path
                d="M427.414 224.08C415.99 224.08 406.054 222.016 397.606 217.888C389.158 213.664 382.678 207.712 378.166 200.032C373.654 192.352 371.398 183.424 371.398 173.248C371.398 159.136 374.038 146.608 379.318 135.664C384.694 124.72 391.942 116.272 401.062 110.32C410.182 104.272 420.31 101.248 431.446 101.248C441.814 101.248 449.686 103.936 455.062 109.312C460.438 114.592 463.126 121.6 463.126 130.336C463.126 136.192 462.07 140.896 459.958 144.448C457.942 148 455.014 149.776 451.174 149.776C448.486 149.776 446.374 149.152 444.838 147.904C443.302 146.656 442.534 144.832 442.534 142.432C442.534 141.568 442.726 139.984 443.11 137.68C443.686 134.8 443.974 132.496 443.974 130.768C443.974 122.032 439.318 117.664 430.006 117.664C423.67 117.664 417.622 119.728 411.862 123.856C406.102 127.984 401.446 134.08 397.894 142.144C394.342 150.112 392.566 159.616 392.566 170.656C392.566 182.176 395.782 191.104 402.214 197.44C408.646 203.68 418.15 206.8 430.726 206.8C436.966 206.8 443.254 206.032 449.59 204.496C456.022 202.864 463.126 200.416 470.902 197.152C472.342 196.576 473.542 196.288 474.502 196.288C476.038 196.288 477.19 196.864 477.958 198.016C478.726 199.168 479.11 200.656 479.11 202.48C479.11 208.336 475.942 212.656 469.606 215.44C462.79 218.416 455.686 220.624 448.294 222.064C440.998 223.408 434.038 224.08 427.414 224.08Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
              <path
                d="M539.847 179.152C541.095 179.152 542.055 179.776 542.727 181.024C543.399 182.272 543.735 183.856 543.735 185.776C543.735 190.384 542.343 193.12 539.559 193.984C533.799 196 527.463 197.152 520.551 197.44C518.727 205.504 515.127 211.984 509.751 216.88C504.375 221.68 498.279 224.08 491.463 224.08C485.703 224.08 480.759 222.688 476.631 219.904C472.599 217.12 469.527 213.424 467.415 208.816C465.303 204.208 464.247 199.216 464.247 193.84C464.247 186.544 465.639 180.064 468.423 174.4C471.207 168.64 475.047 164.176 479.943 161.008C484.839 157.744 490.263 156.112 496.215 156.112C503.511 156.112 509.367 158.656 513.783 163.744C518.295 168.736 520.935 174.928 521.703 182.32C526.215 182.032 531.591 181.072 537.831 179.44C538.599 179.248 539.271 179.152 539.847 179.152ZM492.615 208.816C495.687 208.816 498.327 207.568 500.535 205.072C502.839 202.576 504.375 198.976 505.143 194.272C502.167 192.256 499.863 189.616 498.231 186.352C496.695 183.088 495.927 179.632 495.927 175.984C495.927 174.448 496.071 172.912 496.359 171.376H495.639C491.799 171.376 488.583 173.248 485.991 176.992C483.495 180.64 482.247 185.824 482.247 192.544C482.247 197.824 483.255 201.856 485.271 204.64C487.383 207.424 489.831 208.816 492.615 208.816Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
              <path
                d="M613.168 191.248C614.416 191.248 615.376 191.824 616.048 192.976C616.816 194.128 617.2 195.712 617.2 197.728C617.2 201.568 616.288 204.544 614.464 206.656C610.528 211.456 606.208 215.584 601.504 219.04C596.8 222.4 592.144 224.08 587.536 224.08C580.24 224.08 574.672 219.808 570.832 211.264C566.8 216.352 563.248 219.76 560.176 221.488C557.2 223.216 553.696 224.08 549.664 224.08C543.808 224.08 538.96 221.92 535.12 217.6C531.376 213.184 529.504 207.472 529.504 200.464C529.504 192.784 531.136 185.68 534.4 179.152C537.664 172.528 542.128 167.152 547.792 163.024C553.552 158.8 559.984 156.304 567.088 155.536C568.912 136.912 572.368 121.024 577.456 107.872C582.64 94.624 589.408 88 597.76 88C601.888 88 605.296 89.872 607.984 93.616C610.768 97.36 612.16 103.024 612.16 110.608C612.16 121.36 609.52 133.936 604.24 148.336C598.96 162.736 591.904 177.52 583.072 192.688C583.456 198.256 584.272 202.24 585.52 204.64C586.864 207.04 588.544 208.24 590.56 208.24C593.152 208.24 595.792 207.088 598.48 204.784C601.168 202.48 604.768 198.64 609.28 193.264C610.432 191.92 611.728 191.248 613.168 191.248ZM596.176 102.112C594.352 102.112 592.528 105.376 590.704 111.904C588.88 118.336 587.296 126.784 585.952 137.248C584.704 147.712 583.792 158.656 583.216 170.08C593.968 146.656 599.344 127.84 599.344 113.632C599.344 109.984 599.008 107.152 598.336 105.136C597.76 103.12 597.04 102.112 596.176 102.112ZM554.704 209.536C556.528 209.536 558.352 208.816 560.176 207.376C562 205.84 564.304 203.056 567.088 199.024C566.128 193.84 565.648 188.032 565.648 181.6C565.648 179.296 565.744 175.552 565.936 170.368C560.656 172 556.24 175.552 552.688 181.024C549.232 186.4 547.504 192.4 547.504 199.024C547.504 206.032 549.904 209.536 554.704 209.536Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
              <path
                d="M657.037 195.568C658.285 195.568 659.245 196.144 659.917 197.296C660.685 198.448 661.069 200.032 661.069 202.048C661.069 205.504 660.253 208.48 658.621 210.976C655.933 215.104 652.381 218.32 647.965 220.624C643.645 222.928 638.461 224.08 632.413 224.08C623.197 224.08 616.045 221.344 610.957 215.872C605.869 210.304 603.325 202.816 603.325 193.408C603.325 186.784 604.717 180.64 607.501 174.976C610.285 169.216 614.125 164.656 619.021 161.296C624.013 157.936 629.629 156.256 635.869 156.256C641.437 156.256 645.901 157.936 649.261 161.296C652.621 164.56 654.301 169.024 654.301 174.688C654.301 181.312 651.901 187.024 647.101 191.824C642.397 196.528 634.333 200.272 622.909 203.056C625.213 207.472 629.101 209.68 634.573 209.68C638.509 209.68 641.725 208.768 644.221 206.944C646.813 205.12 649.789 202.048 653.149 197.728C654.301 196.288 655.597 195.568 657.037 195.568ZM633.421 170.368C629.869 170.368 626.845 172.432 624.349 176.56C621.949 180.688 620.749 185.68 620.749 191.536V191.824C626.413 190.48 630.877 188.464 634.141 185.776C637.405 183.088 639.037 179.968 639.037 176.416C639.037 174.592 638.509 173.152 637.453 172.096C636.493 170.944 635.149 170.368 633.421 170.368Z"
                fill="none"
                strokeLinecap="round"
                className="path"
                stroke={ic_svg_stroke}
                strokeWidth="4"
              />
            </svg>
          </div>
          <div className={"lp-header-scroll-down"}>
            <a href={"#lp-about"} style={{ color: "#FFFFFF" }}>
              <FontAwesomeIcon icon={faAngleDown} />
            </a>
          </div>
        </div>
        <section id={"lp-about"}>
          <h1>Test</h1>
        </section>
      </BrowserRouter>
    </>
  );
}
LandingPage.displayName = "LandingPage";
