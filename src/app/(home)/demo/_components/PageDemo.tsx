"use client"

import { useDemoStore } from "../_hooks/useDemoStore"
import { RenderComponent } from "./page-demo/RenderComponent"

export const PageDemo = () => {
    const {id} = useDemoStore()

    return (
        <section className="col-span-5 md:col-span-4">
            <RenderComponent id={id} />
        </section>
    )
}