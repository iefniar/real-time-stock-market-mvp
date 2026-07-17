import { createAuthClient } from 'better-auth/vue'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  fetchOptions: {
    credentials: 'include'
  },
  plugins: [
    inferAdditionalFields({
      user: {
        country: {
          type: 'string'
        },

        investmentGoals: {
          type: 'string'
        },

        riskTolerance: {
          type: 'string'
        },

        preferredIndustry: {
          type: 'string'
        }
      }
    })
  ]
})
