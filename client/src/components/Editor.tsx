import { GanttChart, Image, Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAutoSizeTextArea from "@/hooks/useAutoSizeTextarea";

import {
  BlockNoteEditor,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Blog } from "@/types/blog.types";
import useUpdateImage from "@/hooks/useUpdateImage";

type EditorBlogPropType = {
  currentBlog: Blog;
  handleUpdateCurrentBlog: (name: string, value: string | File) => void;
};

const Editor = ({
  currentBlog,
  handleUpdateCurrentBlog,
}: EditorBlogPropType) => {
  const { mutate, isLoading, data } = useUpdateImage();

  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [subtitle, setSubtitle] = useState("");

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef<HTMLTextAreaElement>(null);
  const coverImageFileRef = useRef<HTMLInputElement>(null);

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote(
    {
      initialContent: currentBlog.contents
        ? JSON.parse(currentBlog.contents)
        : [],
      uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
      // Listens for when the editor's contents change.
      onEditorContentChange: (editor) =>
        // Converts the editor's contents to an array of Block objects.
        handleUpdateCurrentBlog(
          "contents",
          JSON.stringify(editor.topLevelBlocks, null, 2)
        ),
    },
    [currentBlog._id]
  );

  // Resize text area based on title and subtitle respectively
  useAutoSizeTextArea("title-textarea", titleRef.current, currentBlog.title);
  useAutoSizeTextArea("subtitle-textarea", subtitleRef.current, subtitle);

  const subtitleVisibilityHandler = () => {
    setSubtitle("");
    setIsSubtitleVisible((prev) => !prev);
  };

  const titleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    handleUpdateCurrentBlog(event.target.name, event.target.value);

  const subTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setSubtitle(event.target.value);

  const addConverImageHandler = () => coverImageFileRef.current?.click();

  const coverImageChangeHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      mutate({
        file: event.target.files?.[0],
        id: currentBlog._id,
      });
    }
  };

  const removeCoverImageHandler = () => {
    handleUpdateCurrentBlog("coverImage", "");
  };

  useEffect(() => {
    if (data !== null) {
      handleUpdateCurrentBlog("coverImage", data);
    }
  }, [data]);

  return (
    <div className="h-full max-w-screen-lg m-auto">
      {currentBlog.coverImage && (
        <div className="w-full relative h-[500px]">
          <img
            src={currentBlog.coverImage}
            alt={`${currentBlog.title}-cover`}
            className="w-full h-full object-cover"
          />

          <Button
            size="icon"
            variant="secondary"
            className=" absolute top-6 right-6 rounded-full hover:bg-secondary"
            onClick={removeCoverImageHandler}
          >
            <X className="h-5 w-5 text-muted-foreground cursor-pointer" />
          </Button>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <input
          type="file"
          accept="image/*"
          ref={coverImageFileRef}
          onChange={coverImageChangeHandler}
          className="hidden"
        />
        {!currentBlog.coverImage && (
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent hover:bg-secondary transition-all font-medium"
            onClick={addConverImageHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Image className="h-4 w-4 mr-2" />
            )}
            Add Cover
          </Button>
        )}

        {!isSubtitleVisible && (
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent hover:bg-secondary transition-all font-medium"
            onClick={subtitleVisibilityHandler}
            disabled={isLoading}
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
          value={currentBlog.title}
          name="title"
          maxLength={150}
          onChange={titleChangeHandler}
          className="min-h-[30px] appearance-none resize-none border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent font-bold text-4xl"
        />
        {isSubtitleVisible && (
          <div className="flex justify-between">
            <Textarea
              id="subtitle-textarea"
              autoFocus
              placeholder="Blog Subtitle"
              value={subtitle}
              onChange={subTitleChangeHandler}
              maxLength={150}
              className="min-h-[30px] appearance-none resize-none border-none focus-visible:ring-offset-0 focus:border-none focus-visible:ring-transparent text-xl font-medium text-muted-foreground"
            />

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-transparent hover:bg-secondary"
              onClick={subtitleVisibilityHandler}
            >
              <X className="h-5 w-5 text-muted-foreground cursor-pointer m-2" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xl">
        <BlockNoteView
          editor={editor}
          theme="light"
          className="relative -left-10 font-semibold font-inter text-xl pb-60"
          autoCorrect="true"
        />
      </div>
    </div>
  );
};
export default Editor;
