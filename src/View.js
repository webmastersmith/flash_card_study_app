import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { addCard, showAnswer } from "./Controller"

const { pre, div, h1, button, i, span, textarea, p, label } = hh(h)

const btnCSS = (color = "gray", text = 'white') => `py-2 px-4 text-${text} font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 bg-${color}-500 hover:bg-${color}-600 focus:ring-${color}-400 uppercase ease-in-out transition-all duration-300`
const btnDisabled = (color = "gray", text = 'white') => `py-2 px-4 text-${text} font-semibold rounded-lg shadow-md bg-${color}-300 uppercase cursor-not-allowed`

// card components
// const card = (children, data) => div({
// 	className: `bg-yellow-200 h-96 pt-4 px-4 mr-5 mb-5 flex-33 flex flex-col`,
// 	id: data.id,
// 	onsubmit: e => {
// 		e.preventDefault(),
// 			console.log(e)
// 	}
// }, [...children])
const inputBox = (labelName, cssLabel, cssTextArea, value) => div(
	{ className: `overflow-hidden flex-40 ${cssLabel}` }, [
	label({ className: `` }, labelName),
	textarea({
		className: `bg-text-white w-full h-100 ${cssTextArea}`,
		type: 'text',
		value
	})
])

const btn = (data, dispatch, model) => button({
	className: `${btnCSS('green', 'white')}`,
	type: 'submit',
}, "Save"),

const card = (data, dispatch, model) => div({
	className: `bg-yellow-200 h-96 pt-4 px-4 mr-5 mb-5 flex-33 flex flex-col`,
	id: data.id,
	onsubmit: e => {
		e.preventDefault(),
			console.log(e)
	}
}, [
	inputBox(
		'Question',
		'mb-2',
		data.editMode ? '' : 'bg-yellow-200',
		data.question,
		data),

	inputBox(
		'Answer',
		'mt-2',
		data.editMode ? '' : 'bg-yellow-200',
		data.showAnswer ? data.answer : ''),

	// buttons
	div(
		{ className: `flex-20 flex items-center` }, [
		data.editMode ? btn(data, dispatch, model) : ''
	])
])


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
const displayCards = (dispatch, model) => model['cards'].map(data => card(data, dispatch, model))

// total page view !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const view = (dispatch, model) => div({ className: `w-full bg-gray-100 text-black` }, [
	h1({ className: `text-4xl font-bold border-b-2 border-black pb-2` }, 'Flashcard Study'),

	// add flashcard button
	div({ className: `w-100 py-5` }, [
		button(
			{
				className: `${model.isAddButtonDisabled ? btnDisabled() : btnCSS('green', 'white')}`,
				type: 'button',
				disabled: model.isAddButtonDisabled ? true : false,
				onclick: e => dispatch(addCard({
					id: model.nextId,
					question: '',
					answer: '',
					editMode: true,
					showAnswer: false,
					score: 0
				}))
			}, [
			i({ className: `icon-plus text-white pr-2` },),
			span({ className: `` }, 'Add Flashcard'),
		])
	]),

	// cards
	div({ className: `grid grid-cols-3 gap-2 -mr-5` }, [
		model.cards.length === 0 ? card(initial(dispatch, model)) : displayCards(dispatch, model),
	]),

	pre(JSON.stringify(model, null, 2))
])

export default view
