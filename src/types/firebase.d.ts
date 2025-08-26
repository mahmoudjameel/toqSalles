declare module 'firebase/app' {
  export function initializeApp(config: any): any;
}

declare module 'firebase/firestore' {
  export function getFirestore(app: any): any;
  export function doc(db: any, collection: string, document: string): any;
  export function getDoc(docRef: any): Promise<any>;
  export function setDoc(docRef: any, data: any, options?: any): Promise<void>;
  export function onSnapshot(docRef: any, observer: any, errorObserver?: any): () => void;
}

export interface Firestore {
  // Add specific types if needed
}

export interface DocumentSnapshot {
  exists(): boolean;
  data(): any;
}
