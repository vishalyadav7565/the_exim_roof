import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

const CommentSection = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [replyData, setReplyData] = useState({});

  useEffect(() => {
    if (!serviceId) return;

    const unsubscribe = onSnapshot(
      collection(db, "comments"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.serviceId === serviceId)
          .sort(
            (a, b) =>
              (b.createdAt?.seconds || 0) -
              (a.createdAt?.seconds || 0)
          );

        setComments(data);
      }
    );

    return () => unsubscribe();
  }, [serviceId]);

  const mainComments = comments.filter((c) => !c.parentId);
  const getReplies = (id) =>
    comments.filter((c) => c.parentId === id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    await addDoc(collection(db, "comments"), {
      serviceId,
      name,
      message,
      likes: 0,
      createdAt: serverTimestamp(),
      parentId: null,
    });

    setName("");
    setMessage("");
  };

  const handleReply = async (parentId) => {
    const reply = replyData[parentId];
    if (!reply?.name || !reply?.message) return;

    await addDoc(collection(db, "comments"), {
      serviceId,
      name: reply.name,
      message: reply.message,
      likes: 0,
      createdAt: serverTimestamp(),
      parentId,
    });

    setReplyData({ ...replyData, [parentId]: { name: "", message: "" } });
  };

  const handleLike = async (id) => {
    await updateDoc(doc(db, "comments", id), {
      likes: increment(1),
    });
  };

  // 🕒 Format Time
  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "Just now";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "30px", color: "#ffffff" }}>
        💬 Comments ({mainComments.length})
      </h2>

      {/* MAIN FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Write your comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle}>
          Post Comment
        </button>
      </form>

      {mainComments.map((comment) => (
        <div key={comment.id} style={commentCard}>
          <div style={topRow}>
            <div>
              <strong style={{ color: "#fff" }}>
                {comment.name}
              </strong>
              <div style={timeStyle}>
                {formatTime(comment.createdAt)}
              </div>
            </div>
          </div>

          <p style={{ color: "#d1d5db", marginTop: "10px" }}>
            {comment.message}
          </p>

          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <button
              onClick={() => handleLike(comment.id)}
              style={likeBtn}
            >
              ❤️ {comment.likes || 0}
            </button>

            <button
              onClick={() =>
                setReplyData({
                  ...replyData,
                  [comment.id]: { name: "", message: "" },
                })
              }
              style={replyBtn}
            >
              Reply
            </button>
          </div>

          {/* REPLIES */}
          {getReplies(comment.id).map((reply) => (
            <div key={reply.id} style={replyCard}>
              <strong style={{ color: "#fff" }}>
                {reply.name}
              </strong>
              <div style={timeStyle}>
                {formatTime(reply.createdAt)}
              </div>
              <p style={{ color: "#d1d5db", marginTop: "6px" }}>
                {reply.message}
              </p>
              <button
                onClick={() => handleLike(reply.id)}
                style={likeBtn}
              >
                ❤️ {reply.likes || 0}
              </button>
            </div>
          ))}

          {/* REPLY FORM */}
          {replyData[comment.id] && (
            <div style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="Your name"
                value={replyData[comment.id].name}
                onChange={(e) =>
                  setReplyData({
                    ...replyData,
                    [comment.id]: {
                      ...replyData[comment.id],
                      name: e.target.value,
                    },
                  })
                }
                style={inputStyle}
              />
              <textarea
                placeholder="Write reply..."
                value={replyData[comment.id].message}
                onChange={(e) =>
                  setReplyData({
                    ...replyData,
                    [comment.id]: {
                      ...replyData[comment.id],
                      message: e.target.value,
                    },
                  })
                }
                style={textareaStyle}
              />
              <button
                onClick={() => handleReply(comment.id)}
                style={buttonStyle}
              >
                Post Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* 🎨 DARK THEME STYLES */

const container = {
  maxWidth: "750px",
  margin: "60px auto",
  padding: "30px",
  background: "#0f172a",
  borderRadius: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff",
  marginBottom: "12px",
};

const buttonStyle = {
  padding: "10px 18px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const likeBtn = {
  background: "#1e293b",
  border: "1px solid #334155",
  padding: "6px 14px",
  borderRadius: "20px",
  cursor: "pointer",
  color: "#f87171",
};

const replyBtn = {
  background: "transparent",
  border: "none",
  color: "#60a5fa",
  cursor: "pointer",
};

const commentCard = {
  background: "#1e293b",
  padding: "18px",
  borderRadius: "10px",
  marginBottom: "25px",
};

const replyCard = {
  marginTop: "15px",
  marginLeft: "25px",
  padding: "15px",
  background: "#111827",
  borderLeft: "3px solid #3b82f6",
  borderRadius: "8px",
};

const timeStyle = {
  fontSize: "12px",
  color: "#60a5fa",
  marginTop: "4px",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default CommentSection;