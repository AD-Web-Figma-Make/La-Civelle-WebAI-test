import imgImage from "./1c4b19e345ffa7951fb0fca671044d3525820b85.png";
import imgImage1 from "./d85acf8de0e289956f1b8c355d6c287e9358dac7.png";
import imgImage2 from "./089bf9591c22dcdf72dc24c8a0a51a97578bd827.png";

export default function IconReference() {
  return (
    <div className="relative size-full" data-name="IconReference">
      <div className="absolute h-[60px] left-0 top-0 w-[75px]" data-name="IMAGE">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage} />
      </div>
      <div className="absolute h-[60px] left-[264px] top-0 w-[75px]" data-name="IMAGE">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[60px] left-[132px] top-0 w-[75px]" data-name="IMAGE">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage2} />
      </div>
    </div>
  );
}