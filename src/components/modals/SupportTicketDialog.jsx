"use client";
import { useState } from "react";
// import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPaperclip } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createSupportTicketAction } from "@/store/supportTicket/supportTicketThunk";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { ImSpinner8 } from "react-icons/im";
export function SupportTicketDialog({ name, icon }) {
  const { supportTicketLoader } = useSelector((state) => state?.supportTicket);
  // counter++;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName("");
    }
  };
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [ticketId, setTicketId] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserId", user?.UserId); // Replace with actual user id later
    formData.append("Title", title);
    formData.append("Message", message);

    if (file) {
      formData.append("File", file);
    }

    dispatch(
      createSupportTicketAction({
        formData,
        onSuccess: (answer) => {
          setTicketId(answer.detail.TicketId); // Update ticketId state with the received TicketId
        },
      })
    );
  };

  return (
    <Dialog className="rounded-3xl  w-[100vh]">
      <DialogTrigger asChild>
        <div className="flex align-end rounded-3xl pr-2 w-full items-center cursor-pointer hover:bg-light-100 dark:hover:bg-dark-400 text-dark-500 dark:text-white transition duration-200 ease-in-out">
          <div className="p-[5px] rounded-xl w-8 h-8 grid place-items-center">
            {icon}
          </div>
          <div className="text-[14px] font-medium  pl-2">{name}</div>
        </div>
      </DialogTrigger>

      <DialogContent className="rounded-3xl content-dialog sm:max-w-[425px] 2xl:min-w-[80vh]">
        {ticketId ? (
          <div className="flex justify-center align-middle flex-col gap-y-5 ">
            <h2 className="text-center text-3xl font-normal tracking-wide ">
              Ticket Raised
            </h2>
            <p className="text-3xl text-primary text-center">ID {ticketId}</p>
            <Button
              variant="outline"
              className="px-5 text-primary rounded-full  "
              onClick={() => {
                setTicketId(null);
                setTitle("");
                setMessage("");
                setFile(null);
                setFileName("");
              }}
            >
              Confirm & Close
            </Button>
          </div>
        ) : (
          <div>
            <DialogHeader className="header">
              <DialogTitle className="text-3xl mb-5 font-normal tracking-wide">
                Support Ticket
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={onSubmit}
              className="space-y-8"
              enctype="multipart/form-data"
            >
              <section className="dialog-body">
                <div className="mb-4">
                  <label htmlFor="topic">Topic:</label>
                  <input
                    id="title"
                    type="text"
                    name="Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-100 border-b border-b-primary"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="Message"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-32 p-2  rounded-md bg-gray-100 border-b border-b-primary"
                  />
                </div>
                <div>
                  <label htmlFor="file" className="cursor-pointer">
                    <FaPaperclip className="inline" color="gray" />
                    Attach File
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="file"
                    name="File"
                    onChange={handleFileChange}
                  />
                  {fileName && <p>Selected File: {fileName}</p>}
                </div>
              </section>
              <div className="dialog-footer flex justify-end">
                <Button
                  disabled={supportTicketLoader}
                  type="submit"
                  className=" text-white rounded-full align-self px-12"
                >
                  Submit Ticket{"  "}
                  {supportTicketLoader && (
                    <ImSpinner8 className="spinning-icon" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* <DevTool control={control}/> */}
      </DialogContent>
    </Dialog>
  );
}
