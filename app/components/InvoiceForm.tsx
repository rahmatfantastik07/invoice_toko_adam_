"use client";

import { useState, useEffect } from "react";
import InvoicePreview from "./InvoicePreview";
import { generateInvoiceNumber } from "./utils";

export default function InvoiceForm() {

  const [data, setData] = useState<any>({

  invoiceNumber: "",

  date: "",

  logo: "",

  signature: "",

  toko: "Adam Cell",

  alamatToko: "Taliabu",

  teleponToko: "08xxxxxxxxxx",

  namaPelanggan: "",

  alamatPelanggan: "",

  nomorHp: "",

  merkHp: "",

  tipeHp: "",

  imei: "",

  warna: "",

  kelengkapan: "",

  kerusakan: "",

 securityType: "none",

pin: "",

pattern: [],

  catatan: "",

  estimasiBiaya: 0,
  checkup: false,

});

 useEffect(() => {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  setData((prev: any) => ({

    ...prev,

    invoiceNumber:
      prev.invoiceNumber ||
      generateInvoiceNumber(),

    

  }));

}, []);

  const handleFile = (
    e: any,
    type:
      | "logo"
      | "signature"
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {

      setData((prev: any) => ({

        ...prev,

        [type]:
          reader.result,

      }));

    };

    reader.readAsDataURL(
      file
    );

  };

  const handlePhone = (
    value: string
  ) => {

    if (!/^\d*$/.test(value))
      return;

    if (value.length > 13)
      return;

    if (
      value.length > 0 &&
      !value.startsWith("0")
    )
      return;

    setData({

      ...data,

      nomorHp: value,

    });

  };

  const formatRupiahInput = (
    value: string
  ) => {

    const angka =
      value.replace(
        /\D/g,
        ""
      );

    if (!angka)
      return "";

    return new Intl.NumberFormat(
      "id-ID"
    ).format(
      Number(angka)
    );

  };

  const handleBiaya = (
    value: string
  ) => {

    setData({

      ...data,

      estimasiBiaya:
        formatRupiahInput(
          value
        ),

    });

  };
  return (

    <div className="grid lg:grid-cols-2 gap-6 w-280">

      {/* ================= FORM ================= */}

      <div className="bg-white rounded-xl shadow p-5 space-y-4">

        <h2 className="text-xl font-bold border-b pb-2">

          Form Nota Service Adam Cell

        </h2>

        {/* NOMOR NOTA */}

        <div>

          <label className="font-semibold block mb-1">

            Nomor Nota

          </label>

          <input
            className="input w-full"
            value={data.nomorNota}
            onChange={(e) =>
              setData({
                ...data,
                nomorNota:
                  e.target.value,
              })
            }
          />

        </div>

        {/* TANGGAL */}

        <div>

          <label className="font-semibold block mb-1">

            Tanggal

          </label>

          <input
            type="date"
            className="input w-full"
            value={data.tanggal}
            onChange={(e) =>
              setData({
                ...data,
                tanggal:
                  e.target.value,
              })
            }
          />

        </div>

        {/* PELANGGAN */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Data Pelanggan

          </h3>

          <input
            className="input w-full mb-2"
            placeholder="Nama Pelanggan"
            value={data.namaPelanggan}
            onChange={(e) =>
              setData({
                ...data,
                namaPelanggan:
                  e.target.value,
              })
            }
          />

          <input
            className="input w-full"
            placeholder="Nomor HP"
            value={data.nomorHp}
            onChange={(e) =>
              handlePhone(
                e.target.value
              )
            }
          />

        </div>

        {/* DATA HP */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Data Handphone

          </h3>

          <input
            className="input w-full mb-2"
            placeholder="Merk"
            value={data.merk}
            onChange={(e) =>
              setData({
                ...data,
                merk:
                  e.target.value,
              })
            }
          />

          <input
            className="input w-full mb-2"
            placeholder="Type"
            value={data.tipe}
            onChange={(e) =>
              setData({
                ...data,
                tipe:
                  e.target.value,
              })
            }
          />

          <input
            className="input w-full"
            placeholder="IMEI"
            value={data.imei}
            onChange={(e) =>
              setData({
                ...data,
                imei:
                  e.target.value,
              })
            }
          />

        </div>

        {/* JENIS SERVIS */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Jenis Service

          </h3>

          <div className="grid grid-cols-3 gap-3">

            <label>

              <input
                type="checkbox"
                checked={
                  data.checkup
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    checkup:
                      e.target.checked,
                  })
                }
              />

              {" "}Check Up

            </label>

            <label>

              <input
                type="checkbox"
                checked={
                  data.service
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    service:
                      e.target.checked,
                  })
                }
              />

              {" "}Service

            </label>

            <label>

              <input
                type="checkbox"
                checked={
                  data.garansi
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    garansi:
                      e.target.checked,
                  })
                }
              />

              {" "}Garansi

            </label>

          </div>

        </div>

                {/* KELENGKAPAN */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Kelengkapan

          </h3>

          <textarea
            className="input w-full min-h-24"
            placeholder="Contoh: Baterai, Sim Card, Memory, Charger, LCD, Backdoor"
            value={data.kelengkapan}
            onChange={(e) =>
              setData({
                ...data,
                kelengkapan:
                  e.target.value,
              })
            }
          />

        </div>

        {/* KERUSAKAN */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Keluhan / Kerusakan

          </h3>

          <textarea
            className="input w-full min-h-28"
            placeholder="Jelaskan kerusakan handphone..."
            value={data.kerusakan}
            onChange={(e) =>
              setData({
                ...data,
                kerusakan:
                  e.target.value,
              })
            }
          />

        </div>

        {/* PIN / POLA */}

        <div className="border rounded p-3">

  <h3 className="font-bold mb-3">
    Keamanan Perangkat
  </h3>

  <select
    className="input w-full mb-3"
    value={data.securityType}
    onChange={(e) =>
      setData({
        ...data,
        securityType: e.target.value,
      })
    }
  >
    <option value="none">
      Tidak Ada
    </option>

    <option value="pin">
      PIN
    </option>

    <option value="password">
      Password
    </option>

    <option value="pattern">
      Pola
    </option>

  </select>

  {(data.securityType === "pin" ||
    data.securityType === "password") && (

    <input
      className="input w-full mb-3"
      placeholder={
        data.securityType === "pin"
          ? "Masukkan PIN"
          : "Masukkan Password"
      }
      value={data.pin}
      onChange={(e) =>
        setData({
          ...data,
          pin: e.target.value,
        })
      }
    />

  )}

  {data.securityType === "pattern" && (

  <div className="align-middle">

    <p className="mb-2 font-semibold ">
      Klik titik sesuai pola
    </p>

    <div
      className="
      grid
      grid-cols-3
      gap-4
      w-40
      "
    >

      {[1,2,3,4,5,6,7,8,9].map(
        (num) => (

          <button
            key={num}
            type="button"
            onClick={() => {

              if (
                data.pattern.includes(
                  num
                )
              )
                return;

              setData({
                ...data,
                pattern: [
                  ...data.pattern,
                  num,
                ],
              });

            }}
            className={`
            w-10
            h-10
            rounded-full
            border-2
            ${
              data.pattern.includes(
                num
              )
                ? "bg-blue-600 text-white"
                : "bg-white"
            }
          `}
          >
            {num}
          </button>

        )
      )}

    </div>

    <button
      type="button"
      className="
      mt-3
      bg-red-500
      text-white
      px-3
      py-1
      rounded
      "
      onClick={() =>
        setData({
          ...data,
          pattern: [],
        })
      }
    >
      Reset Pola
    </button>

  </div>

)}

</div>
        {/* ESTIMASI */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Estimasi Biaya

          </h3>

          <input
            type="number"
            className="input w-full"
            placeholder="Estimasi Biaya Service"
            value={
              data.estimasiBiaya
            }
            onChange={(e) =>
              setData({
                ...data,
                estimasiBiaya:
                  Number(
                    e.target.value
                  ),
              })
            }
          />

        </div>

        {/* LOGO */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Upload Logo Adam Cell

          </h3>

          <input
            type="file"
            className="w-full"
            accept="image/*"
            onChange={(e) =>
              handleFile(
                e,
                "logo"
              )
            }
          />

        </div>

        {/* TTD */}

        <div className="border rounded p-3">

          <h3 className="font-bold mb-3">

            Upload Tanda Tangan

          </h3>

          <input
            type="file"
            className="w-full"
            accept="image/*"
            onChange={(e) =>
              handleFile(
                e,
                "signature"
              )
            }
          />

        </div>

        {/* TOMBOL */}

        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
        >

          Preview Nota Service

        </button>

      </div>

      {/* ================= PREVIEW ================= */}

      <InvoicePreview
        data={data}
      />

    </div>
      );
}
