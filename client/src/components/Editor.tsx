import { GanttChart, Image, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useRef, useState } from "react";
import useAutoSizeTextArea from "@/hooks/useAutoSizeTextarea";

const Editor = () => {
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef<HTMLTextAreaElement>(null);

  // Resize text area based on title and subtitle respectively
  useAutoSizeTextArea("title-textarea", titleRef.current, title);
  useAutoSizeTextArea("subtitle-textarea", subtitleRef.current, subtitle);

  const subtitleVisibilityHandler = () => {
    setSubtitle("");
    setIsSubtitleVisible((prev) => !prev);
  };

  const titleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setTitle(event.target.value);

  const subTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setSubtitle(event.target.value);

  return (
    <div className="h-full max-w-screen-lg m-auto">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="bg-transparent hover:bg-secondary transition-all font-medium"
        >
          <Image className="h-4 w-4 mr-2" />
          Add Cover
        </Button>

        {!isSubtitleVisible && (
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent hover:bg-secondary transition-all font-medium"
            onClick={subtitleVisibilityHandler}
          >
            <GanttChart className="h-4 w-4 mr-2" />
            Add Subtitle
          </Button>
        )}
      </div>

      <div className="w-full mt-5">
        <Textarea
          id="title-textarea"
          placeholder="Blog Title"
          value={title}
          maxLength={150}
          onChange={titleChangeHandler}
          className="min-h-[30px] appearance-none resize-none border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent font-bold text-4xl"
        />
        {isSubtitleVisible && (
          <div className="flex justify-between">
            <Textarea
              id="subtitle-textarea"
              placeholder="Blog Subtitle"
              value={subtitle}
              onChange={subTitleChangeHandler}
              maxLength={150}
              className="min-h-[30px] appearance-none resize-none border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent text-xl font-normal text-muted-foreground"
            />

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={subtitleVisibilityHandler}
            >
              <X className="h-5 w-5 text-muted-foreground cursor-pointer m-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Editor;
