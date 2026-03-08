const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3002/api/testing/reset')
    await request.post('http://localhost:3002/api/users', {
      data: {
        username: 'hari',
        name: 'mika',
        password: 'moringa'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeDefined()
    await expect(page.getByLabel('password')).toBeDefined()
    await expect(page.getByRole('button', {name: 'Login'})).toBeDefined()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('hari')
      await page.getByLabel('password').fill('moringa')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('mika logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('hari')
      await page.getByLabel('password').fill('amantios')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('logged in')).not.toBeVisible()
    })
  })
})