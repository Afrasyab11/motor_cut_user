"use client";
import React, { useEffect } from "react";
//react icons
import { FaFileUpload } from "react-icons/fa";
import "./account.css";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { getCookie } from "cookies-next";
import { getCustomerInvoices } from "@/actions/stripe/getInvoices";
import { toast } from "react-toastify";

const Billing = () => {
  const [invoices, setInvoices] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    invoices: true,
  });
  const [lastInvoiceId, setLastInvoiceId] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
  };

  let user = JSON.parse(getCookie("user") || "{}");


  const fetchInvoices = async () => {
    if (user?.StripeCustomerId) {
      try {
        const customerInvoices = await getCustomerInvoices(
          user?.StripeCustomerId,
          lastInvoiceId
        );
        setInvoices(customerInvoices.data);

        if (customerInvoices.data.length > 0) {
          const lastId =
            customerInvoices.data[customerInvoices.data.length - 1].id;
          setLastInvoiceId(lastId);
        }
        setHasMore(customerInvoices.has_more);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Failed to fetch invoices");
      }
    }
    setLoadingStates((prev) => ({ ...prev, invoices: false }));
  };

  useEffect(() => {
    fetchInvoices();
  }, [user?.StripeCustomerId]);

  return (
    <>
      <div className="">
        <h2 className="card-title text-2xl font-medium tracking-normal py-3 px-6">
          Billing
        </h2>
      </div>
      <div className=" bar-scroll h-[300px] overflow-auto   px-3 md:px-5">
        <table
          cellPadding="0"
          cellpadding="0"
          className="table border-spacing-0 w-full border-none border-collapse"
        >
          <thead className="border-none">
            <tr className="border-none">
              <th className="border-r-gray-400 border-r-2 rounded-xl">Date</th>
              <th className="border-r-gray-400 border-r-2">Amount</th>
              <th className="">Download</th>
            </tr>
          </thead>

          <tbody className="border-none  ">
            {invoices && invoices?.length > 0 ? (
              invoices?.map((invoice, index) => (
                <tr key={invoice?.id} className="hover:bg-gray-300 border-none">
                  <td className="border-r-gray-400 border-r-2">
                    {invoice?.status_transitions?.paid_at &&
                      convertTimestampToDate(
                        invoice?.status_transitions?.paid_at
                      )}
                  </td>
                  <td className="border-r-gray-400 border-r-2">
                    ${invoice.amount_paid / 100}
                  </td>
                  <td className="text-center">
                    <a href={invoice.invoice_pdf} className="block">
                      <FaFileUpload className="m-auto" color="gray" />
                    </a>
                  </td>
                </tr>
              ))
            ) : loadingStates.invoices ? (
              <tr className="h-40">
                <td colSpan="3" className="text-center">
                  <ImSpinner8 className="spinning-icon" />
                </td>
              </tr>
            ) : (
              <tr className="h-40">
                <td colSpan="3">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-2">
        {hasMore && (
          <button onClick={fetchInvoices} className="text-primary font-medium">
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Billing;
