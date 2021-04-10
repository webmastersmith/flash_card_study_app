import * as R from 'ramda'
const MSG = {
	ADD_CARD: 'ADD_CARD',
	EDIT_QUESTION: "EDIT_QUESTION",
	EDIT_ANSWER: "EDIT_ANSWER",
	SAVE_CARD: 'SAVE_CARD',
	CANCEL_CARD: 'CANCEL_CARD',
	SHOW_ANSWER: "SHOW_ANSWER",
}

export function addCard(card) {
	return {
		type: MSG.ADD_CARD,
		card,
	}
}
export function editQuestion(data) {
	return {
		type: MSG.EDIT_QUESTION,
		data,
	}
}
export function editAnswer(data) {
	return {
		type: MSG.EDIT_ANSWER,
		data,
	}
}
export function saveCard(data) {
	return {
		type: MSG.SAVE_CARD,
		data,
	}
}
export function showAnswer(cardData) {
	return {
		type: MSG.SHOW_ANSWER,
		cardData,
	}
}

// R.filter(R.complement(R.propEq('id', id)))(model) // all but match
// R.filter(R.propEq('id', id))(model) // only match
function edit(id, model) {
	const { cards: oldCards, nextId: oldNextId } = model
	const idx = R.findIndex(R.propEq('id', id))(oldCards)
	const [newCard] = R.filter(R.propEq('id', id))(oldCards)
	const newCards = R.filter(R.complement(R.propEq('id', id)))(oldCards)
	return { idx, newCard, newCards, oldNextId }
}

function update(msg, model) {
	switch (msg.type) {
		case MSG.ADD_CARD: {
			const { card } = msg
			const { cards: oldCards, isAddButtonDisabled } = model
			const cards = [card, ...oldCards]
			return { ...model, cards, isAddButtonDisabled: true }
		}
		case MSG.EDIT_QUESTION: {
			const { data: { id, question } } = msg
			const { idx, newCard, newCards } = edit(id, model)
			const card = { ...newCard, question }
			const cards = R.insert(idx, card)(newCards)
			return { ...model, cards }
		}
		case MSG.EDIT_ANSWER: {
			const { data: { id, answer } } = msg
			const { idx, newCard, newCards } = edit(id, model)
			const card = { ...newCard, answer }
			const cards = R.insert(idx, card)(newCards)
			return { ...model, cards }
		}
		case MSG.SAVE_CARD: {
			const { data: { id, editMode } } = msg
			const { idx, newCard, newCards, oldNextId } = edit(id, model)
			const card = { ...newCard, editMode, showAnswer: false }
			const cards = R.insert(idx, card)(newCards)
			const nextId = oldNextId + 1
			const isAddButtonDisabled = false
			return { ...model, cards, nextId, isAddButtonDisabled }

			return { ...model }
		}
		case MSG.CANCEL_CARD: {
			return { ...model }
		}
		case MSG.SHOW_ANSWER: {
			return { ...model }
		}
	}
	return model
}

export default update
