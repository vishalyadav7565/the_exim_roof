import React, { useEffect, useState, useRef, useCallback } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";

const FooterComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const speed = 0.4;

  // 🔥 Firestore realtime listener
 useEffect(() => {
  const q = query(
    collection(db, "comments"),
    orderBy("createdAt", "desc"),
    limit(3)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(data);
      setLoading(false);
    },
    (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);

  // 🔥 Infinite Smooth Animation
  const animate = useCallback(() => {
    if (!sliderRef.current || isPausedRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    positionRef.current -= speed;

    const sliderWidth = sliderRef.current.scrollWidth / 2;

    if (Math.abs(positionRef.current) >= sliderWidth) {
      positionRef.current = 0;
    }

    sliderRef.current.style.transform = `translateX(${positionRef.current}px)`;

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [comments, animate]);

  // Pause on hover
  const handleMouseEnter = () => (isPausedRef.current = true);
  const handleMouseLeave = () => (isPausedRef.current = false);

  // Drag support
  const handleMouseDown = (e) => {
    isPausedRef.current = true;
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.startX = e.pageX;
    sliderRef.current.startPosition = positionRef.current;
  };

  const handleMouseMove = (e) => {
    if (!sliderRef.current.startX) return;

    const dx = e.pageX - sliderRef.current.startX;
    positionRef.current = sliderRef.current.startPosition + dx;

    sliderRef.current.style.transform = `translateX(${positionRef.current}px)`;
  };

  const handleMouseUp = () => {
    sliderRef.current.startX = null;
    isPausedRef.current = false;
    sliderRef.current.style.cursor = "grab";
  };

  // ✅ PREMIUM SKELETON LOADER
  if (loading) {
    return (
      <div style={container}>
        <h3 style={title}>💬 What Our Clients Say</h3>

        <div style={wrapper}>
          <div style={{ display: "flex", gap: "30px" }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={skeletonCard}>
                <div style={skeletonAvatar}></div>
                <div style={skeletonLine}></div>
                <div style={{ ...skeletonLine, width: "60%" }}></div>
                <div style={{ ...skeletonLine, height: "60px" }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (comments.length === 0) return null;

  const infiniteComments = [...comments, ...comments];

  return (
    <div style={container}>
      <h3 style={title}>💬 What Our Clients Say</h3>

      <div
        style={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          style={track}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {infiniteComments.map((comment, index) => (
            <div key={index} style={card}>
              <div style={avatar}>
                {comment.name?.charAt(0).toUpperCase()}
              </div>
              <div style={name}>{comment.name}</div>
              <div style={service}>
                {comment.serviceId?.replace(/-/g, " ")}
              </div>
              <p style={message}>{comment.message}</p>
            </div>
          ))}
        </div>
      </div>

      <button style={button}>View All Comments</button>
    </div>
  );
};

/* 🎨 STYLES */

const container = {
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  padding: "70px 20px",
  textAlign: "center",
  overflow: "hidden",
};

const title = {
  color: "#ffffff",
  marginBottom: "40px",
  fontSize: "22px",
  fontWeight: "600",
};

const wrapper = {
  overflow: "hidden",
  cursor: "grab",
};

const track = {
  display: "flex",
  gap: "30px",
  willChange: "transform",
};

const card = {
  minWidth: "300px",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px)",
};

const avatar = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
  color: "#fff",
  margin: "0 auto 15px",
};

const name = {
  fontWeight: "600",
  color: "#ffffff",
  marginBottom: "5px",
};

const service = {
  fontSize: "12px",
  color: "#60a5fa",
  marginBottom: "15px",
  textTransform: "capitalize",
};

const message = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "1.6",
};

const button = {
  marginTop: "40px",
  padding: "12px 25px",
  borderRadius: "30px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

/* Skeleton */

const skeletonCard = {
  minWidth: "300px",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
};

const skeletonAvatar = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  background: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

const skeletonLine = {
  width: "80%",
  height: "14px",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

export default FooterComments;