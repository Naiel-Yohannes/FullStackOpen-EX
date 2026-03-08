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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('hari')
      await page.getByLabel('password').fill('moringa')
      await page.getByRole('button', {name: 'login'}).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', {name:'create new blog'}).click()
      await page.getByLabel('title:').fill('why playwright testing is simple')
      await page.getByLabel('author:').fill('a random dev')
      await page.getByLabel('url:').fill('https://playwright.dev')
      await page.getByRole('button', {name:'create'}).click()
      
      await expect(page.getByText('why playwright testing is simple a random dev')).toBeVisible()
    })
  })
})