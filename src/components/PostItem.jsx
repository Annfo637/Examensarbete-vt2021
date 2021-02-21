import React from "react";
import styled from "styled-components";

export default function PostItem({ author, post }) {
  return (
    <div>
      <h3>{author}</h3>
      <p>{post}</p>
    </div>
  );
}
