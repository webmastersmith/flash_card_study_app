import * as R from 'ramda'
const MSG = {
	ADD_CARD: 'ADD_CARD',
	EDIT_CARD: 'EDIT_CARD',
	EDIT_QUESTION: "EDIT_QUESTION",
	EDIT_ANSWER: "EDIT_ANSWER",
	SAVE_CARD: 'SAVE_CARD',
	DELETE_CARD: 'DELETE_CARD',
	SHOW_ANSWER: "SHOW_ANSWER",
	SCORE_CARD: "SCORE_CARD"
}

export function addCard(card) {
	return { type: MSG.ADD_CARD, card }
}
export function editCard(id) {
	return { type: MSG.EDIT_CARD, id }
}
export function editQuestion(data) {
	return { type: MSG.EDIT_QUESTION, data }
}
export function editAnswer(data) {
	return { type: MSG.EDIT_ANSWER, data }
}
export function saveCard(id) {
	return { type: MSG.SAVE_CARD, id }
}
export function deleteCard(id) {
	return { type: MSG.DELETE_CARD, id }
}
export function showAnswer(id) {
	return { type: MSG.SHOW_ANSWER, id }
}
export function scoreCard(data) {
	return { type: MSG.SCORE_CARD, data }
}

// R.filter(R.complement(R.propEq('id', id)))(model) // all but match
// R.filter(R.propEq('id', id))(model) // only match
function edit(id, model) {
	const { cards: oldCards, nextId: oldNextId, isNewCard } = model
	const idx = R.findIndex(R.propEq('id', id))(oldCards)
	const [newCard] = R.filter(R.propEq('id', id))(oldCards)
	const newCards = R.filter(R.complement(R.propEq('id', id)))(oldCards)
	return { idx, newCard, newCards, oldNextId, isNewCard }
}

function update(msg, model) {
	switch (msg.type) {
		case MSG.ADD_CARD: {
			const { card } = msg
			const { cards: oldCards } = model
			const cards = [card, ...oldCards]
			return { ...model, cards, isAddButtonDisabled: true, isNewCard: true }
		}
		case MSG.EDIT_CARD: {
			const { id } = msg
			const { idx, newCard, newCards } = edit(id, model)
			const card = { ...newCard, editMode: true, showAnswer: true }
			const cards = R.insert(idx, card)(newCards)
			return { ...model, cards }
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
			const { id } = msg
			const { idx, newCard, newCards, oldNextId, isNewCard } = edit(id, model)
			const card = { ...newCard, editMode: false, showAnswer: false }
			const cards = R.insert(idx, card)(newCards)
			const nextId = isNewCard ? oldNextId + 1 : oldNextId
			return { ...model, cards, nextId, isAddButtonDisabled: false, isNewCard: false }
		}
		case MSG.DELETE_CARD: {
			const { id } = msg
			const { newCards: cards } = edit(id, model)
			return { ...model, cards }
		}
		case MSG.SHOW_ANSWER: {
			const { id } = msg
			const { idx, newCard, newCards } = edit(id, model)
			const card = { ...newCard, showAnswer: true, showGradeBtn: true }
			const cards = R.insert(idx, card)(newCards)
			return { ...model, cards, isAddButtonDisabled: true }
		}
		case MSG.SCORE_CARD: {
			const { data: { id, score } } = msg
			const { idx, newCard, newCards } = edit(id, model)
			const card = { ...newCard, score, showAnswer: false, showGradeBtn: false }
			const cardsGroup = R.insert(idx, card)(newCards)
			const cards = R.sortWith([
				R.ascend(R.prop('score')),
			])(cardsGroup)
			return { ...model, cards, isAddButtonDisabled: false }
		}
	}
	return model
}

export default update
