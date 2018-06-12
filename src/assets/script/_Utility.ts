export default class Utility {
	public static isPalmtop = () => /(iPhone|iPad|Android|Mobile)/.test(navigator.userAgent);
}
