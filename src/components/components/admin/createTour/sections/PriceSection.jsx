import { Form, InputNumber, Select, Row, Col } from "antd"
import { Section, SwitchField } from "../tourFormHelpers"
import { CURRENCIES } from "../tourSchema"

const { Option } = Select

const PriceSection = ({ formData, set }) => (
  <Section title="Price">
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Amount"
          name="priceAmount"
          rules={[
            { required: true, message: "Price is required" },
            { type: "number", min: 0, message: "Must be ≥ 0" },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="1200"
            value={formData.price.amount}
            onChange={(v) => set("price.amount", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Currency is required" }]}
        >
          <Select
            placeholder="USD"
            value={formData.price.currency || undefined}
            onChange={(v) => set("price.currency", v)}
          >
            {CURRENCIES.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={5}>
        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[{ type: "number", min: 0, max: 100, message: "0–100%" }]}
        >
          <InputNumber
            min={0}
            max={100}
            style={{ width: "100%" }}
            placeholder="0"
            value={formData.price.discount}
            onChange={(v) => set("price.discount", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={6} md={5}>
        <SwitchField
          name="perPerson"
          label="Per Person"
          value={formData.price.perPerson}
          onChange={(v) => set("price.perPerson", v)}
        />
      </Col>
    </Row>
  </Section>
)

export default PriceSection