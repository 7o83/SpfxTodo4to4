/********** 見た目調整用共通関数 **********/
export const DateFormatJa = (datestring: string): string  => {
	const TempDate = new Date(datestring);
	return TempDate.toLocaleDateString("ja");
};
export const DateTimeFormatJa = (datestring: string) : string => {
	const TempDate = new Date(datestring);
	return TempDate.toLocaleString("ja");
};

/********** JSON調整用共通関数 **********/
export const ObjectMerge = <T extends Object>(copyToObj: T, copyFromObj: Object): T => {
	Object.keys(copyToObj).forEach(key => {
		if (key in copyFromObj) {
			copyToObj[key] = copyFromObj[key];
		}
	});
	return copyToObj;
};

