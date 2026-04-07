import type { Metadata } from 'next'
import Link from 'next/link'
import { PRICING_PLANS, getYearlySavings } from '@/data/pricing'
import { Check, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing & Subscription Plans',
  description: 'Choose the perfect plan for your feng shui and destiny journey',
}

export default function PricingPage() {
  const plans = Object.values(PRICING_PLANS)

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your spiritual journey
          </p>

          {/* Toggle Monthly/Yearly */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-gray-700">Monthly Billing</span>
            <button className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"></span>
            </button>
            <span className="text-gray-700">Yearly Billing</span>
            <span className="ml-4 inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              Save up to 38%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const savings = getYearlySavings(plan.tier)
            const isPopular = plan.tier === 'premium'

            return (
              <div
                key={plan.tier}
                className={`relative rounded-2xl border-2 transition-all duration-300 ${
                  isPopular
                    ? 'border-red-500 bg-white shadow-2xl scale-105'
                    : 'border-gray-200 bg-white shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.priceMonthly.toLocaleString('vi-VN')}
                      </span>
                      <span className="text-gray-600">VND</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">per month, billed monthly</p>

                    {plan.priceYearly > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-semibold text-blue-900 mb-1">
                          💡 Save with yearly billing
                        </div>
                        <div className="text-lg font-bold text-blue-900">
                          {(plan.priceYearly / 12).toLocaleString('vi-VN')}đ
                          <span className="text-sm text-blue-700 ml-2">
                            per month (save {plan.priceYearlyDiscount}%)
                          </span>
                        </div>
                        {savings > 0 && (
                          <div className="text-xs text-blue-700 mt-2">
                            Save {savings.toLocaleString('vi-VN')}đ per year
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                      isPopular
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.tier === 'free' ? 'Get Started' : 'Start Free Trial'}
                  </button>

                  {/* Best For */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Best for: </span>
                      {plan.bestFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      What's included:
                    </h3>
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{feature.name}</p>
                          {feature.details && (
                            <p className="text-xs text-gray-600">{feature.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-8 py-4 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">Free</th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">Premium</th>
                  <th className="px-8 py-4 text-center font-semibold text-gray-900">VIP</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample comparison rows */}
                {[
                  {
                    name: 'Tu Vi Charts',
                    free: '3/month',
                    premium: 'Unlimited',
                    vip: 'Unlimited',
                  },
                  { name: 'Detailed Analysis', free: false, premium: true, vip: true },
                  { name: 'Date Filtering', free: false, premium: true, vip: true },
                  { name: 'Feng Shui Interior', free: false, premium: false, vip: true },
                  { name: 'PDF Export', free: false, premium: false, vip: true },
                  { name: 'Ad-Free', free: false, premium: true, vip: true },
                  { name: 'Priority Support', free: false, premium: false, vip: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-8 py-4 font-medium text-gray-900">{row.name}</td>
                    <td className="px-8 py-4 text-center">
                      {typeof row.free === 'string' ? (
                        <span className="text-sm text-gray-600">{row.free}</span>
                      ) : row.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-8 py-4 text-center">
                      {typeof row.premium === 'string' ? (
                        <span className="text-sm text-gray-600">{row.premium}</span>
                      ) : row.premium ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-8 py-4 text-center">
                      {typeof row.vip === 'string' ? (
                        <span className="text-sm text-gray-600">{row.vip}</span>
                      ) : row.vip ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time without any hidden fees or penalties.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Free tier users can access basic features forever. Premium and VIP have a 7-day free trial.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you are not satisfied with your subscription.',
              },
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes, you can change your subscription tier anytime. Changes take effect immediately.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <summary className="cursor-pointer font-semibold text-gray-900 hover:text-red-600">
                  {faq.q}
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Have questions about pricing?</p>
          <Link
            href="/contact"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
