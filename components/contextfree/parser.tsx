'use client'

import { ReactNode } from "react";
import { useState } from 'react';
import "./parser.scss";

export function Item({first, second, editable = false, onFirstChange, onSecondChange}) {
	return editable ?
	<div className="parser-item parser-item-editable">
		<input value={first} onChange={(e) => onFirstChange(e.target.value)}/>
		<span>&#10230;</span>
		<input value={second} onChange={(e) => onSecondChange(e.target.value)}/>
	</div>:
	<div className="parser-item">{first} &#10230; {second}</div>
}

export function ItemEditor({nonTerminalSymbols, terminalSymbols, onAdd}) {
	const [first, setFirst] = useState("");
	const [second, setSecond] = useState("");

	let onFirstChange = (newFirst) => {
		setFirst([...newFirst].filter(ch => nonTerminalSymbols.has(ch)).join(''));
	};
	let onSecondChange = (newSecond) => {
		setSecond([...newSecond].filter(ch => nonTerminalSymbols.has(ch) || terminalSymbols.has(ch)).join(''));
	};
	
	return <form className="transition-config" onSubmit={(e) => {e.preventDefault(); onAdd(first, second);}}>
   	    	<Item first={first} second={second} editable={true} onFirstChange={onFirstChange} onSecondChange={onSecondChange} />
   	    	<button>Hinzufügen</button>
 	</form>
}

export function Parser() {
	const [nonTerminalSymbols, setNonTerminalSymbols] = useState(new Set(['E', 'S']));
	const [terminalSymbols, setTerminalSymbols] = useState(new Set(['(', ')', '+', 'z']));
	const [transitions, setTransitions] = useState([]);

	let onNonTerminalChange = (e) => {
		const newNonTerminalSymbols = new Set(e.target.value.toUpperCase().replace(/[^A-Z]+/g, '').split(''));
		[...terminalSymbols].forEach((v) => newNonTerminalSymbols.delete(v.toUpperCase()));
		setNonTerminalSymbols(newNonTerminalSymbols);
	}
	let onTerminalChange = (e) => {
		const newTerminalSymbols = new Set(e.target.value.toLowerCase().split(''));
		[...nonTerminalSymbols].forEach((v) => newTerminalSymbols.delete(v.toLowerCase()));
		setTerminalSymbols(newTerminalSymbols);
	}
	let addTransition = (first, second) => {
		setTransitions([...transitions, {first, second}]);
	}

    return <div className="parser">
    	<h1>Parser Simulation</h1>
   		<form className="gramar-config">
   			<label>
   				Nichtterminale:
  	        	<input placeholder="Nichtterminale" value={Array.from(nonTerminalSymbols).join('')} onChange={onNonTerminalChange} />
			</label>
			<label>
				Terminale:
  	        	<input placeholder="Terminale" value={Array.from(terminalSymbols).join('')} onChange={onTerminalChange} />
  	        </label>
	    </form>
	    <h3>Produktionen</h3>
	    <div className="transitions">
    	    {transitions.map((transition, i) => <Item key={i} first={transition.first} second={transition.second}/>)}
	    </div>
		<ItemEditor nonTerminalSymbols={nonTerminalSymbols} terminalSymbols={terminalSymbols} onAdd={addTransition}/>
    </div>
};
