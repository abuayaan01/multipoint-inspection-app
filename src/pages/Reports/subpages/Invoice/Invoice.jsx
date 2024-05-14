import React, { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import SaveButton from "../../../../components/SaveButton";
import { updateInvoiceReq } from "../../../../services/api";
import { useForm, Controller } from "react-hook-form";
import { useComponent } from "../../../../Context/ComponentContext";
import Swal from "sweetalert2";
import FormFieldsCreator from "../../../../components/FormFieldsCreator";

function Invoice({ toggleRefresh, invoice, id }) {
  const { register, handleSubmit, watch, setValue, control } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setCurrentComponentName } = useComponent();
  const [extra, setExtra] = useState([]);

  const onSubmit = async (data) => {
    if(totalAmount < 0){
      Swal.fire({
        icon: "error", // You can use 'success', 'error', 'warning', 'info', etc.
          title: "Discount cannot be more than fee.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
      })
      return;
    }
    setLoading(true);
    const invoice = { ...data, totalAmount, extra: extra };
    await updateInvoiceReq(id, invoice).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success", // You can use 'success', 'error', 'warning', 'info', etc.
          title: "Saved",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        toggleRefresh();
      }
    });
    setLoading(false);
  };

  const fee = watch("fee");
  const discount = watch("discount");

  useEffect(() => {
    setTotalAmount(fee - discount);
  }, [fee, discount]);


  useEffect(() => {
    for (const key in invoice) {
      if (invoice.hasOwnProperty(key)) {
        setValue(key, invoice[key]);
      }
    }
    if (invoice?.extra) {
      setExtra(invoice?.extra);
    } else {
      setExtra([]);
    }
  }, [setValue, invoice]);

  useEffect(() => {
    setCurrentComponentName("Invoice");
  }, []);

  const paymentOptions = ["", "Not Paid", "Cash", "Check", "Credit Card"];

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="editForm shadow-xl flex flex-wrap rounded-3xl"
      >
        <Input
          type={"number"}
          label={"Fee ($)"}
          name={"fee"}
          register={register}
          required={true}
        />
        <Input
          type={"number"}
          label={"Discount ($)"}
          name={"discount"}
          register={register}
        />

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Select
              label={"Payment Method"}
              field={field}
              options={paymentOptions}
            />
          )}
        />

        { watch("paymentMethod") == "Check" ?
          <Input
            type={"number"}
            label={"Check Number"}
            name={"checkNumber"}
            register={register}
          /> : null
        }
        <div className="w-full">
          <FormFieldsCreator extra={extra} setExtra={setExtra} />
        </div>

        <div className="total w-full flex justify-between items-end">
          <SaveButton loading={loading} />
          <div className="mx-3">
            <p className="text-slate-600 text-right font-semibold py-5">
              Invoice
            </p>
            <p className="text-slate-100 inline px-3 py-1 rounded bg-gradient-to-r from-[#faab3b] to-[#f6985a] text-xl">
              Total Amount : $ {totalAmount}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Invoice;
