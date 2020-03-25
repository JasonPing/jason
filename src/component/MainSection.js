import React from "react";
import { AnimateFont } from "./AnimateFont";
import { ScrollDownArrow } from "./ScrollDownArrow";
import { Carton } from "./Carton";

function MainSection() {
  return (
    <section className="section light-blue-bg">
      <AnimateFont />
      <ScrollDownArrow />
    </section>
  );
}

export { MainSection };
