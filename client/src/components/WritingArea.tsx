import { PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";

type WritingAreaPropType = {
  isSidebarOpen: boolean;

  handleToggleSidebar: () => void;
};

const WritingArea = ({
  isSidebarOpen,
  handleToggleSidebar,
}: WritingAreaPropType) => {
  return (
    <div className="flex-1 p-4">
      <div>
        {!isSidebarOpen && (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-transparent hover:bg-secondary transition-all duration-200"
            onClick={() => handleToggleSidebar()}
          >
            <PanelRightClose className="h-5 w-5 text-muted-foreground cursor-pointer font-light" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default WritingArea;
