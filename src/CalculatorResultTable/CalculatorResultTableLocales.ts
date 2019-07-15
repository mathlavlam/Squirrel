import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
	en: {
		year: 'Year',
		contribPerYear: 'Contributions per year',
		contribPer: 'Contributions per {term}',
		bottomNote: '* Contributions for the current year are counted from today until the end of the year. It is therefore normal that contributions for the current year are lower than other years.'
	},
	fr: {
		year: 'Année',
		contribPerYear: 'Contribution par année',
		contribPer: 'Contribution par {term}',
		bottomNote: '* Les contributions de l\'année en cours sont comptées à partir d\'aujourd\'hui jusqu\'à la fin de l\'année. Il est donc normale que les contributions de l\'année en cours soient plus basses que les autres années.'
	}
});