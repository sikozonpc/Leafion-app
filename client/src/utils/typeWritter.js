let i = 0;
const typeWriter = (text, duration) => {
	let output = "";

	if (i < text.length) {
		output += text.charAt(i);
		i++;
		console.log(output);
		return output;
	}
};
export default typeWriter;
