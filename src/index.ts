/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

export class ArrayList<T> {

	private array: Array<T>;

	public constructor(...values: T[]) {

		this.array = values;

	}

	public get(index: number): T | undefined {

		return this.array[index];

	}

	public indexOf(value: T): number {

		for (let i: number = 0; i < this.array.length; i ++) {
			const v: T = this.array[i];
			if (v === value) return i;
		}

		return -1;

	}

	public indexesOf(value: T): ArrayList<number> {

		const indexes: ArrayList<number> = new ArrayList<number>();

		for (let i: number = 0; i < this.array.length; i ++) {

			const v: T = this.array[i];
			if (v === value) indexes.add(i);

		}

		return indexes;

	}

	public contains(value: T): boolean {

		return this.indexOf(value) !== -1;

	}

	public add(value: T): void {

		this.array.push(value);

	}

	public insert(value: T, index: number): void {

		this.array.splice(index, 0, value);

	}

	public remove(index: number): void {

		this.array.splice(index, 1);

	}

	public removeValue(value: T): void {

		const i: number = this.indexOf(value);
		if (i >= 0) this.remove(i);

	}

	public map<U>(handler: (value: T) => U): ArrayList<U> {

		const newArr: ArrayList<U> = new ArrayList<U>();
		for (let i: number = 0; i < this.array.length; i ++) newArr.add(handler(this.array[i]));

		return newArr;

	}

	public async mapSync<U>(handler: (value: T) => Promise<U>): Promise<ArrayList<U>> {

		const newArr: ArrayList<U> = new ArrayList<U>();
		for (let i: number = 0; i < this.array.length; i ++) newArr.add(await handler(this.array[i]));

		return newArr;

	}

	public forEach(handler: (value: T) => void): void {

		for (let i: number = 0; i < this.array.length; i ++) handler(this.array[i]);

	}

	public async forEachSync(handler: (value: T) => Promise<void>): Promise<void> {

		for (let i: number = 0; i < this.array.length; i ++) await handler(this.array[i]);

	}

	public conformsTo(handler: (value: T, index: number) => boolean): boolean {

		for (let i: number = 0; i < this.array.length; i ++) if (!handler(this.array[i], i)) return false;

		return true;

	}

	public async conformsToSync(handler: (value: T, index: number) => Promise<boolean>): Promise<boolean> {

		for (let i: number = 0; i < this.array.length; i ++) if (!(await handler(this.array[i], i))) return false;

		return true;

	}

	public filter(handler: (value: T, index: number) => boolean): void {

		const newArr: ArrayList<T> = new ArrayList<T>();

		for (let i: number = 0; i < this.array.length; i ++) {

			const v: T = this.array[i];
			if (handler(v, i)) newArr.add(v);

		}

		this.array = newArr.array;

	}

	public async filterSync(handler: (value: T, index: number) => Promise<boolean>): Promise<void> {

		const newArr: ArrayList<T> = new ArrayList<T>();

		for (let i: number = 0; i < this.array.length; i ++) {

			const v: T = this.array[i];
			if (await handler(v, i)) newArr.add(v);

		}

		this.array = newArr.array;

	}

	public sort(handler?: (a: T, b: T) => number): void {

		this.array.sort(handler);

	}

	public reverse(): void {

		this.array.reverse();

	}

	public join(separator: string): void {

		this.array.join(separator);

	}

	public shuffle(iterations: number = 1): void {

		for (let iteration: number = 0; iteration <= iterations; iteration++) {

			for (let i: number = 0; i < this.array.length; i++) {

				const j: number = Math.floor(Math.random() * (i + 1));
				const temp: T = this.array[i];

				this.array[i] = this.array[j];
				this.array[j] = temp;

			}

		}

	}

	public size(): number {

		return this.array.length;

	}

	public sub(start: number, end: number): ArrayList<T | undefined> {

		const newArr: ArrayList<T> = new ArrayList<T>();
		for (let i: number = start; i <= end; i++) newArr.add(this.array[i]);

		return newArr;

	}

	public toArray(): T[] {

		return this.array;

	}

	public equals(value: ArrayList<any>, lazy: boolean = false): boolean {

		if ((this.size() !== value.size()) && !lazy) return false;
		for (let i: number = 0; this.array.length; i ++) if (value.get(i) !== this.array[i]) return false;

		return true;

	}

	public fromArray(value: any[]): void {

		this.array = value;

	}

}