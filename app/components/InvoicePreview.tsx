"use client";

import { useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { formatRupiah, formatTanggal } from "./utils";

export default function InvoicePreview({ data }: any) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    try {
      const element = printRef.current;

      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 120;

      const imgWidth = pdfWidth;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, 120, 120);

      pdf.save(`${data.invoiceNumber}.pdf`);
    } catch (error) {
      console.error(error);

      alert("Gagal membuat PDF");
    }
  };

  const sectionHeight = {
    pelanggan: "100px",
    handphone: "120px",
    kelengkapan: "90px",
    kerusakan: "180px",
    catatan: "120px",
    syarat: "170px",
  };

  return (
    <div className="w-full font-bold">
      <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        Download PDF
      </button>

      <div
        className="
            w-full
            overflow-x-auto
          "
      ></div>

      <div
        ref={printRef}
        className="bg-whitetext-black  shadow-lg      mx-auto      grid      grid-cols-1      lg:grid-cols-2      gap-6    "
        style={{
          width: "245mm",
          minHeight: "190mm",
          padding: "8mm",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}

        <div className="flex justify-between items-start border-b-2 border-black pb-3">
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                lineHeight: "30px",
              }}
            >
              ADAM CELL
            </h1>
            <p>Taliabu</p>
            <p>{data.teleponToko}</p>
          </div>

          <div className="text-right">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>

        {/* JUDUL */}

        <div className="text-center mt-4 mb-4">
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            NOTA PENERIMAAN SERVICE HP
          </h2>
        </div>

        {/* INFORMASI SERVICE */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
            fontSize: "13px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "80px",
                  padding: "4px",
                  border: "none",
                }}
              >
                No Service
              </td>
              <td
                style={{
                  width: "7px",
                  border: "none",
                }}
              >
                :
              </td>
              <td
                style={{
                  padding: "4px",
                  border: "none",
                }}
              >
                {data.invoiceNumber}
              </td>
              <td
                style={{
                  width: "35px",
                  padding: "4px",
                  border: "none",
                }}
              >
                Tanggal
              </td>
              <td style={{ border: "none" }}>:</td>
              <td style={{ width: "150px", padding: "4px", border: "none" }}>
                {data.date ? formatTanggal(data.date) : "-"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* DATA PELANGGAN */}
        <div
          style={{
            border: "1px   solid black",
            marginBottom: "15px",
          }}
        >
          <div
            className="text-white text-center font-bold p-2"
            style={{ background: "#ff0000" }}
          >
            DATA PELANGGAN
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "160px",
                    padding: "6px",
                  }}
                >
                  Nama
                </td>

                <td
                  style={{
                    width: "10px",
                  }}
                >
                  :
                </td>

                <td>{data.namaPelanggan}</td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "6px",
                  }}
                >
                  Alamat
                </td>

                <td>:</td>

                <td>{data.alamatPelanggan}</td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "6px",
                  }}
                >
                  No. HP
                </td>

                <td>:</td>

                <td>{data.nomorHp}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DATA HANDPHONE */}

        <div
          style={{
            border: "1px  solid black",
            marginBottom: "15px",
          }}
        >
          <div
            className="text-white text-center font-bold p-2"
            style={{ background: "#ff0000" }}
          >
            DATA HANDPHONE
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "160px",
                    padding: "6px",
                  }}
                >
                  Merk HP
                </td>
                <td
                  style={{
                    width: "10px",
                  }}
                >
                  :
                </td>
                <td>{data.merkHp}</td>
              </tr>

              <tr>
                <td style={{ padding: "6px" }}>Tipe / Model</td>
                <td>:</td>

                <td>{data.tipeHp}</td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "6px",
                  }}
                >
                  IMEI
                </td>

                <td>:</td>

                <td>{data.imei}</td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "6px",
                  }}
                >
                  Warna
                </td>

                <td>:</td>

                <td>{data.warna}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* KELENGKAPAN */}

        <div
          style={{
            border: "1px   solid black",
            marginBottom: "15px",
          }}
        >
          <div
            className="text-white text-center font-bold p-2"
            style={{ background: "#ff0000" }}
          >
            KELENGKAPAN
          </div>

          <div
            style={{
              minHeight: sectionHeight.kelengkapan,
              padding: "10px",
              fontSize: "13px",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.kelengkapan || "-"}
          </div>
        </div>

        {/* KERUSAKAN */}

        <div
          style={{
            border: "1px   solid black",
            marginBottom: "15px",
          }}
        >
          <div
            className="text-white text-center font-bold p-2"
            style={{ background: "#ff0000" }}
          >
            KELUHAN / KERUSAKAN
          </div>

          <div
            style={{
              minHeight: "120px",
              padding: "10px",
              fontSize: "13px",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.kerusakan || "-"}
          </div>
        </div>

        {/* PIN */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "15px",
            fontSize: "13px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "180px",
                  padding: "6px",
                  border: "1px   solid black",
                }}
              >
                PIN / POLA / PASSWORD
              </td>

              <td
                style={{
                  border: "1px   solid black",
                  padding: "6px",
                }}
              >
                {data.securityType === "pattern"
                  ? data.pattern.join("-")
                  : data.pin}

                {data.securityType === "pattern" ? (
                  <div
                    className="                   grid                          grid-cols-3                          gap-3                          w-fit
                          "
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div
                        key={num}
                        className={`
          w-6
          h-6
          rounded-full
          border-2

          ${data.pattern.includes(num) ? "" : "bg-white"}
        `}
                      />
                    ))}
                  </div>
                ) : (
                  <span>{data.pin}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ESTIMASI */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "13px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "180px",
                  padding: "6px",
                  border: "1px   solid black",
                  fontWeight: "bold",
                }}
              >
                ESTIMASI BIAYA
              </td>

              <td
                style={{
                  border: "1px   solid black",
                  padding: "6px",
                  fontWeight: "bold",
                }}
              >
                {formatRupiah(data.estimasiBiaya || 0)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* CATATAN */}

        <div
          style={{
            border: "1px   solid black",
            marginBottom: "20px",
          }}
        >
          <div
            className="text-white text-center font-bold "
            style={{ background: "#ff0000", padding: "6px" }}
          >
            CATATAN
          </div>

          <div
            style={{
              minHeight: "80px",
              padding: "10px",
              fontSize: "13px",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.catatan || "-"}
          </div>
        </div>

        {/* SYARAT & KETENTUAN */}

        <div
          style={{
            border: "1px   solid black",
            marginBottom: "20px",
          }}
        >
          <div
            className="text-white text-center font-bold p-2"
            style={{ background: "#ff0000" }}
          >
            SYARAT & KETENTUAN
          </div>

          <div
            style={{
              padding: "10px",
              fontSize: "11px",
              lineHeight: "18px",
            }}
          >
            <div>
              1. Barang yang sudah diperbaiki wajib diambil maksimal 30 hari
              setelah selesai.
            </div>

            <div>
              2. Kerusakan yang tidak terdeteksi sebelumnya bukan menjadi
              tanggung jawab teknisi.
            </div>

            <div>
              3. Kehilangan data selama proses servis bukan tanggung jawab pihak
              toko.
            </div>

            <div>
              4. Garansi servis hanya berlaku sesuai kesepakatan dan tidak
              berlaku apabila terdapat kerusakan fisik.
            </div>

            <div>
              5. Unit yang tidak diambil lebih dari 3 bulan dianggap
              ditinggalkan pemilik.
            </div>
          </div>
        </div>

        {/* TANDA TANGAN */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "35px",
            gap: "40px",
          }}
        >
          {/* PELANGGAN */}

          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Pelanggan
            </div>

            <div
              style={{
                height: "90px",
              }}
            />

            <div
              style={{
                borderTop: "1px   solid black",
                paddingTop: "5px",
                fontSize: "13px",
              }}
            >
              {data.namaPelanggan || "(............................)"}
            </div>
          </div>

          {/* ADAM CELL */}

          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Adam Cell
            </div>

            {data.signature && (
              <img
                src={data.signature}
                alt="Tanda Tangan"
                style={{
                  height: "80px",
                  objectFit: "contain",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            )}

            {!data.signature && (
              <div
                style={{
                  height: "90px",
                }}
              />
            )}

            <div
              style={{
                borderTop: "1px   solid black",
                paddingTop: "5px",
                fontSize: "13px",
              }}
            >
              Admin Adam Cell
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontSize: "11px",
            color: "#555",
          }}
        >
          <div>
            Terima kasih telah mempercayakan perbaikan perangkat Anda kepada
            Adam Cell.
          </div>

          <div
            style={{
              marginTop: "4px",
            }}
          >
            Taliabu • {data.teleponToko}
          </div>
        </div>
      </div>
    </div>
  );
}
