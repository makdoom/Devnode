import { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-all duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
      ></div>

      <div
        className={`fixed inset-y-0 right-0 max-w-full duration-300 flex transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative w-screen max-w-[250px]">
          <div className="h-full flex flex-col py-6 bg-white border-l">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
