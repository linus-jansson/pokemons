
"use client"

import React, { useState, useRef } from "react"
import _pokemons from "../data/pokemons"

type poke = {
    id: number
    name: string
}

function PokeCard(props : any) {
    const elementRef = useRef<HTMLDivElement>(null)

    const tiltEffect = (e: React.MouseEvent<HTMLDivElement>) => {
        if (elementRef.current === null) return;

        let elementLeft = elementRef.current.offsetLeft
        let elementTop = elementRef.current.offsetTop

        let mouseX = e.pageX
        let mouseY = e.pageY

        let percentageX = (mouseX - elementLeft) / 128
        let percentageY = (mouseY - elementTop) / 128

        const maxTilt = 10
        let tiltX = ((maxTilt / 2) - ((percentageX) * maxTilt)).toFixed(2);
        let tiltY = (((percentageY) * maxTilt) - (maxTilt / 2)).toFixed(2);
        // const scaleX, scaleY, scaleZ = 1.2
        const scale = 1.25
        elementRef.current.style.transform = `perspective(${100}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${scale},${scale},${scale})`
    }

    function left() {
        if (elementRef.current === null) return;
        elementRef.current.style.transform = `scaleX(1) scaleY(1)`
    }

    return (
        <div ref={elementRef} key={props.id} onMouseLeave={left} onMouseMove={tiltEffect} className="bg-zinc-800 group-hover:opacity-75 h-32 w-32 rounded-lg shadow-xl hover:scale-110 hover:!opacity-100 hover:rounded-xl duration-100 p-2">
            <p>{props.id}</p>
            <p>{props.name}</p>
        </div>
    )
}

export default function Home() {
    const [inputValue, setInputValue] = useState('1')
    const [pokemons, setPokemons] = useState<poke[]>([])

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
        if (e.target.value === '') {
            setPokemons([])
            return
        }
        const filteredPokemons = (input: any) => _pokemons.filter((pokemon: any) => {
                if (pokemon.id > 2000) return;

                if (pokemon.pokemon.includes(input) || 
                    pokemon.id.toString().includes(input)
                ) {
                    console.log(pokemon)
                    return pokemon
                }
            })
            
        let new_poke = filteredPokemons(e.target.value) as poke[]
        setPokemons(new_poke)

    }

    return (
        <>  
            <div className="grid place-items-center h-screen">
                <input value={inputValue} onChange={onChangeHandler} className="bg-zinc-700"/>
                <div className="flex flex-wrap w-1/2 justify-center gap-2 group opacity-100 ">
                    {pokemons.map((pokemon: any) => {
                        return (
                            <PokeCard id={pokemon.id} name={pokemon.pokemon} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
