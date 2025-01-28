'use client'

import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";

const EmbeddedReadme = ({ link }) => {
  const [readme, setReadme] = useState("");

  useEffect(() => {
    if (link) {
      fetch(link)
        .then((res) => res.text())
        .then((text) => setReadme(text))
        .catch((err) => console.error("Error fetching README:", err));
    }
  }, [link]);

  return (
    <div className='prose markdown flex flex-col gap-4'>
      <ReactMarkdown>{readme}</ReactMarkdown>
    </div>
  )
}

export default EmbeddedReadme