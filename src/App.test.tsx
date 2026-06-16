import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

const getCells = () => screen.getAllByRole('gridcell');

const clickLetters = async (word: string) => {
  const user = userEvent.setup();

  for (const letter of word) {
    await user.click(screen.getByRole('button', { name: letter }));
  }
};

const submitGuess = async (word: string) => {
  const user = userEvent.setup();

  await clickLetters(word);
  await user.click(screen.getByRole('button', { name: 'ENTER' }));
};

describe('Wordle app', () => {
  it('renders an empty six-attempt board', () => {
    render(<App />);

    const cells = getCells();

    expect(cells).toHaveLength(30);
    expect(cells.every((cell) => cell.textContent === '')).toBe(true);
    expect(cells.every((cell) => cell.dataset.status === 'empty')).toBe(true);
  });

  it('lets the player type and delete letters in the active row', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'R' }));
    await user.click(screen.getByRole('button', { name: 'E' }));
    await user.click(screen.getByRole('button', { name: 'ESCAPE' }));

    const cells = getCells();

    expect(cells[0].textContent).toBe('R');
    expect(cells[1].textContent).toBe('');
  });

  it('shows a message instead of submitting a short word', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'R' }));
    await user.click(screen.getByRole('button', { name: 'E' }));
    await user.click(screen.getByRole('button', { name: 'ENTER' }));

    expect(screen.getByText('Not enough letters')).toBeTruthy();
    expect(getCells()[0].dataset.status).toBe('empty');
  });

  it('marks a correct guess and ends the game', async () => {
    render(<App />);

    await submitGuess('REACT');

    const firstRow = getCells().slice(0, 5);

    expect(firstRow.map((cell) => cell.textContent).join('')).toBe('REACT');
    expect(firstRow.every((cell) => cell.dataset.status === 'correct')).toBe(true);
    expect(screen.getByText('Correct!')).toBeTruthy();
  });

  it('uses all attempts and reveals the answer after the final miss', async () => {
    render(<App />);

    for (let attempt = 0; attempt < 6; attempt += 1) {
      await submitGuess('AAAAA');
    }

    expect(screen.getByText('The word was REACT')).toBeTruthy();
    expect(getCells().map((cell) => cell.textContent).join('')).toBe('AAAAA'.repeat(6));
  });
});
