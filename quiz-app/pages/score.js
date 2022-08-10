import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Header from "../components/header";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getQuizScoreById } from "../lib/quiz-api";

function Score() {
    // const [data] = useState([0, 5, 10, 15, 20, 25]);
    const router = useRouter()
    const path = router.asPath
    debugger
    const array = path.split("=")
    const id = array[1]
    const { data } = useSWR([`/score/${id}`, id], getQuizScoreById)

    const svgRef = useRef();
    useEffect(() => {
        // setting up svg
        if (data) {
            debugger
            const w = 400;
            const h = 300;

            const yMaxValue = d3.max(data.score, (d) => d);
            const yMinValue = d3.min(data.score, (d) => d);

            const svg = d3
                .select(svgRef.current)
                .attr("width", w)
                .attr("height", h)
                .style("background", "#d3d3d3")
                .style("margin-top", "50")
                .style("overflow", "visible");
            //  setting the scale
            const xScale = d3
                .scaleLinear()
                .domain([0, data.score.length - 1])
                .range([0, w]);
            const yScale = d3
                .scaleLinear()
                .domain([yMinValue, yMaxValue])
                .range([h, 0]);
            const generateScaleLine = d3
                .line()
                .x((d, i) => xScale(i))
                .y(yScale);
            //   .curve(d3.curveCardinal);

            const xAxis = d3
                .axisBottom(xScale)
                .ticks(data.length)
                .tickFormat((i) => i);

            const yAxis = d3.axisLeft(yScale).ticks(data.score.length * 2);
            svg
                .append("g")
                .attr("class", "grid")
                .call(d3.axisLeft(yScale).tickSize(-w).tickFormat(""));
            svg
                .append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0,${h})`)
                .call(d3.axisBottom(xScale).tickSize(-h).tickFormat(""));
            svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
            svg.append("g").call(yAxis);
            svg
                .selectAll(".line")
                .data([data.score])
                .join("path")
                .attr("d", (d) => generateScaleLine(d))
                .attr("fill", "none")
                .attr("stroke", "black");
        }
    }, [data]);

    return (
        <div>
            <Header />
            {data &&
                <div className="flex justify-center">
                    <svg ref={svgRef}></svg>
                </div>
            }
        </div>
    );
}

export default Score;
