import { Form, InputNumber, DatePicker, Row, Col } from "antd"
import { Section } from "../tourFormHelpers"

const BookingSection = ({ formData, set }) => (
  <Section title="Booking">
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Available Until"
          name="availableUntil"
          rules={[{ required: true, message: "Date is required" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            onChange={(_, dateStr) => set("booking.availableUntil", dateStr)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={8} md={4}>
        <Form.Item
          label="Total Seats"
          name="totalSeats"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 1, message: "Min 1" },
          ]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            value={formData.booking.totalSeats}
            onChange={(v) => set("booking.totalSeats", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={8} md={4}>
        <Form.Item
          label="Available Seats"
          name="availableSeats"
          dependencies={["totalSeats"]}
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 0, message: "Min 0" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const total = getFieldValue("totalSeats")
                if (value == null || total == null || value <= total)
                  return Promise.resolve()
                return Promise.reject(new Error("Cannot exceed total seats"))
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            value={formData.booking.availableSeats}
            onChange={(v) => set("booking.availableSeats", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={6} md={4}>
        <Form.Item
          label="Min Age"
          name="minAge"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 0, max: 99, message: "0–99" },
          ]}
        >
          <InputNumber
            min={0}
            max={99}
            style={{ width: "100%" }}
            value={formData.booking.minAge}
            onChange={(v) => set("booking.minAge", v)}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={6} md={4}>
        <Form.Item
          label="Max Age"
          name="maxAge"
          rules={[
            { type: "number", min: 0, max: 120, message: "0–120" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const min = getFieldValue("minAge")
                if (value == null || min == null || value >= min)
                  return Promise.resolve()
                return Promise.reject(new Error("Must be ≥ min age"))
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            max={120}
            style={{ width: "100%" }}
            placeholder="No limit"
            value={formData.booking.maxAge ?? undefined}
            onChange={(v) => set("booking.maxAge", v)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Section>
)

export default BookingSection