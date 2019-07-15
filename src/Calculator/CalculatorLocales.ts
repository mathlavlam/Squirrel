import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
	en: {
		existingLabel: 'I\'ve already got: ',
		contributionLabel: 'I plan to put aside ',
		dollarsEach: '$ each',
		week: 'week',
		month: 'month',
		year: 'year',
		growthLabel: 'I expect an average growth rate of about ',
		percentPerYear: '% per year',
		yearsLabel: 'I would like to know how much I will have accumulated in ',
		inflationRateLabel: 'I want to index my contributions to a level of ',
		resultPreTitle: 'In {years} {yearTerm}, you will have saved :',
	},
	fr: {
		existingLabel: 'J\'ai déjà accumulé : ',
		contributionLabel: 'Je prévois mettre de côté ',
		dollarsEach: '$ à chaque',
		week: 'semaine',
		month: 'mois',
		year: 'année',
		growthLabel: 'Je prévois un taux de croissance moyen d\'environ ',
		percentPerYear: '% par année',
		yearsLabel: 'J\'aimerais savoir le montant que j\'aurai accumulé dans ',
		inflationRateLabel: 'Je désire indexer mes contributions à un niveau de ',
		resultPreTitle: 'En {years} {yearTerm}, vous aurez accumulé :',
	}
});