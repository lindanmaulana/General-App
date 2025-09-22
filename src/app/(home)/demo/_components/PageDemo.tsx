"use client"

import { useDemoStore } from "../_hooks/useDemoStore"
import { RenderComponent } from "./page-demo/RenderComponent"

export const PageDemo = () => {
    const {id} = useDemoStore()

    return (
        <div className="col-span-4">
            <RenderComponent id={id} />
        </div>
    )
}