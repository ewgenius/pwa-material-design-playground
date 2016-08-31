interface FirebaseStatic {

}

declare var Firebase: FirebaseStatic;

declare module 'firebase' {
	export = Firebase;
}