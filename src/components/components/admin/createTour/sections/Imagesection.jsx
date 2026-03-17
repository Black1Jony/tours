import { useState } from "react";
import api from "../../../../../api/api";
import { Section } from "../tourFormHelpers";
import { Upload, message, Spin } from "antd";
import { PlusOutlined, StarFilled, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

const S = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 12,
    marginTop: 12,
  },
  card: (isCover) => ({
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    border: isCover ? "2.5px solid #1677ff" : "2.5px solid transparent",
    boxShadow: isCover ? "0 0 0 3px rgba(22,119,255,.18)" : "0 2px 8px rgba(0,0,0,.10)",
    cursor: "pointer",
    background: "#f5f5f5",
    aspectRatio: "4/3",
  }),
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  coverBadge: {
    position: "absolute", top: 6, left: 6,
    background: "#1677ff", color: "#fff",
    borderRadius: 4, padding: "2px 7px",
    fontSize: 11, fontWeight: 600,
    display: "flex", alignItems: "center", gap: 4,
    pointerEvents: "none",
  },
  deleteBtn: {
    position: "absolute", top: 6, right: 6,
    background: "rgba(0,0,0,.55)", color: "#fff",
    border: "none", borderRadius: 4,
    width: 26, height: 26,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 13,
  },
  uploadArea: {
    border: "2px dashed #d9d9d9", borderRadius: 10,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    cursor: "pointer", background: "#fafafa",
    aspectRatio: "4/3", color: "#8c8c8c", fontSize: 13,
    width: "100%",
  },
  hint: { marginTop: 8, fontSize: 12, color: "#8c8c8c" },
  coverHint: { marginTop: 8, fontSize: 12, color: "#1677ff", display: "flex", alignItems: "center", gap: 4 },
};

const ImageSection = ({ formData, set }) => {
  const [images, setImages] = useState([]);

  const handleUpload = async (file) => {
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setImages((prev) => [...prev, { uid, url: null, uploading: true }]);

    const body = new FormData();
    body.append("photos", file);

    try {
      const res = await api.post("/uploadPhotos", body);
console.log("sending to:", api.defaults?.baseURL + "/uploadPhotos");

      const uploadedUrls = res.data.urls;

      setImages((prev) => {
        const updated = prev.map((img) =>
          img.uid === uid ? { uid, url: uploadedUrls[0], uploading: false } : img
        );
        const allUrls = updated.filter((i) => i.url).map((i) => i.url);
        set("photos", allUrls);
        set("media.cover", allUrls[0] || "");
        return updated;
      });

      message.success(`${file.name} загружен`);
    } catch (err) {
      // ✅ Показываем реальную ошибку с бэка, не generic текст
      const serverMsg = err.response?.data?.error;
      console.error("Upload failed:", serverMsg || err.message, err.response?.data);
      message.error(serverMsg ? `Ошибка: ${serverMsg}` : `${file.name} — ошибка загрузки`);
      setImages((prev) => prev.filter((img) => img.uid !== uid));
    }
  };

  const setCover = (url) => {
    set("media.cover", url);
    const reordered = [url, ...(formData.photos || []).filter((u) => u !== url)];
    set("photos", reordered);
    setImages((prev) =>
      [prev.find((i) => i.url === url), ...prev.filter((i) => i.url !== url)].filter(Boolean)
    );
  };

  const removeImage = (uid, url, e) => {
    e.stopPropagation();
    setImages((prev) => {
      const updated = prev.filter((i) => i.uid !== uid);
      const allUrls = updated.filter((i) => i.url).map((i) => i.url);
      set("photos", allUrls);
      if (formData.media?.cover === url) set("media.cover", allUrls[0] || "");
      return updated;
    });
  };

  const coverUrl = formData.media?.cover || images.find((i) => i.url)?.url;

  return (
    <Section title="Tour Images">
      {images.length === 0 && (
        <p style={S.hint}>Загрузите фотографии тура. Первое фото станет обложкой.</p>
      )}

      <div style={S.grid}>
        {images.map((img) => {
          const isCover = img.url && img.url === coverUrl;
          return (
            <div key={img.uid} style={S.card(isCover)} onClick={() => img.url && setCover(img.url)}>
              {img.uploading ? (
                <div style={{ ...S.img, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
              ) : (
                <img src={img.url} alt="tour" style={S.img} />
              )}
              {isCover && (
                <div style={S.coverBadge}>
                  <StarFilled style={{ fontSize: 10 }} /> Обложка
                </div>
              )}
              {img.url && (
                <button style={S.deleteBtn} onClick={(e) => removeImage(img.uid, img.url, e)}>
                  <DeleteOutlined />
                </button>
              )}
            </div>
          );
        })}

        <Upload
          multiple
          showUploadList={false}
          accept="image/*"
          beforeUpload={(file) => { handleUpload(file); return false; }}
        >
          <div style={S.uploadArea}>
            <PlusOutlined style={{ fontSize: 22, marginBottom: 6 }} />
            <span>Добавить фото</span>
          </div>
        </Upload>
      </div>

      {images.some((i) => i.url) && (
        <p style={S.coverHint}>
          <StarFilled style={{ fontSize: 11 }} />
          Синяя рамка — текущая обложка. Нажмите другое фото чтобы изменить.
        </p>
      )}
    </Section>
  );
};

export default ImageSection;