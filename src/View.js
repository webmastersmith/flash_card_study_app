import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { createCard } from "./Controller"

const { pre, div, h1, button, i, span, textarea, p, label, form } = hh(h)

const btn = (color = "gray", text = 'white') => `py-2 px-4 text-${text} font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 bg-${color}-500 hover:bg-${color}-600 focus:ring-${color}-400 uppercase ease-in-out transition-all duration-300`

// card components
const card = (children) => form({
	className: `bg-yellow-200 w-80 h-96 pt-4 px-4 mr-5`,
	onsubmit: e => {
		e.preventDefault(),
			console.log(e)
	}
},
	[...children])

// const inputBox = (data, dispatch, model) => textarea({
// 	className: `bg-text-white w-full h-90% flex items-start`,
// 	placeholder: data.id,
// 	type: 'text',
// })


const inputBox = (labelName, cssLabel, cssTextArea = '', value = '', data, dispatch, model) => div(
	{ className: `overflow-hidden ${cssLabel} h-40%` }, [
	label({ className: `` }, labelName),
	textarea({
		className: `bg-text-white w-full h-90% flex items-start ${cssTextArea}`,
		type: 'text',
		value
	})
])

const saveBtn = (data, dispatch, model) => div(
	{ className: `overflow-hidden h-20% flex items-center ` }, [
	button({
		className: `${btn('green', 'white')}`,
		type: 'submit',
		onclick: e => {
			// e.preventDefault()
			// console.log(e)
		}
	}, "Save"),
])



// card types
const question = (data, dispatch, model) => [
	inputBox(
		'Questions',
		'pb-4',
		'bg-yellow-200',
		data.question,
		data, dispatch, model),

	inputBox(
		'Answers',
		'pt-4',
		'bg-yellow-200',
		data.showAnswer ? data.answer : '',
		data, dispatch, model),
]

const edit = (data, dispatch, model) => [
	inputBox('Questions', 'pb-4', '', data.question, data, dispatch, model),
	inputBox('Answers', 'pt-4', '', data.answer, data, dispatch, model),
	saveBtn(data, dispatch, model)
]

// no cards? display starter card.
const initial = (dispatch, model) => [
	div({ className: `h-full flex justify-center items-center` }, [
		div({ className: `text-center font-semibold text-2xl` }, [
			p({ className: `mb-2` }, 'Welcome!'),
			p({ className: `` }, 'Press "ADD CARD" to get started.')
		]),
	]),
]

// display all available cards.
const display = (dispatch, model) => model['cards'].map(data => card(
	data.editMode ? edit(data, dispatch, model) : question(data, dispatch, model)
))

// total page view
const view = (dispatch, model) => div({ className: `w-full bg-gray-100 text-black` }, [
	h1({ className: `text-4xl font-bold border-b-2 border-black pb-2` }, 'Flashcard Study'),

	// button
	div({ className: `w-100 py-5` }, [
		button({ className: `${btn('green', 'white')}`, type: 'button' }, [
			i({ className: `icon-plus text-white pr-2` },),
			span({ className: `` }, 'Add Flashcard'),
		])
	]),

	// cards
	div({ className: `flex flex-row -mr-5` }, [
		model.cards.length === 0 ? card(initial(dispatch, model)) : display(dispatch, model),
	]),

	pre(JSON.stringify(model, null, 2))
])

export default view
