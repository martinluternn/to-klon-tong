export default abstract class Singleton<T> {
    protected instance: T | null = null;
    protected hasInitialized: boolean = false;

    abstract initialize(...args: any[]): void;

    public isInitialized(): boolean {
        return this.hasInitialized;
    }

    getShared(): T {
        if (!this.instance)
            throw new Error('Please initialize the instance');
        return this.instance;
    }
}
